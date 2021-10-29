import { Component, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common'
import { TrialdetailService } from '../trialdetail.service';
import { DashboardPhysicianComponent } from '../dashboard-physician/dashboard-physician.component';
import { ClinicalTrialListClinicalSite, ClinicalTrialListResults } from '../dashboard-physician/clinicaltriallist.model';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { ClinicalsiteService } from '../clinicalsite.service';
import { TouchSequence } from 'selenium-webdriver';
const iconRetinaUrl = '../backoffice/assets/leaflet-map/marker-icon-2x.png';
const iconUrl = '../backoffice/assets/leaflet-map/marker-icon.png';
const shadowUrl = '../backoffice/assets/leaflet-map/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [22, 35],
  iconAnchor: [12, 41],
  popupAnchor: [-1, -35],
  tooltipAnchor: [16, -28],
  shadowAnchor: [12, 47],
  // shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-clinicaltrial-detail',
  templateUrl: './clinicaltrial-detail.component.html',
  styleUrls: ['./clinicaltrial-detail.component.css']
})
export class ClinicalTrialDetailComponent implements AfterViewInit {
  static readonly SELECTED_ID : string = "selected_ctr_id";

  @Input() breadcrumb = true;

  creationReview: boolean = false;

  // Main object for entire clinical trial details
  clinicalTrialDetailObj?: ClinicalTrialListResults;

  @Output() clinicalTrialReady: EventEmitter<ClinicalTrialListResults> = new EventEmitter<ClinicalTrialListResults>();

  // Array for showing multiple clinical sites in the map
  clinicalSites?: ClinicalTrialListClinicalSite[];

  // Leaflet map
  private map?: L.Map;

  // Boolean variables for eligibility criteria
  isEligibilityCriteriaExpanded = true;
  hideEligibilityCriteriaExpanded = false;

  @ViewChild('eligibilityCriteriaText')
  eligibilityCriteriaText: ElementRef | undefined;

  ecHtml: any;

  document: any;

  constructor(private location: Location,
    private trialDetailService: TrialdetailService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private csService: ClinicalsiteService,
    private ctrService: ClinicalTrialService,
    @Inject(DOCUMENT) document: any
    ) { 
      this.document = document;
    }

  ngAfterViewInit(): void {
    const self = this;
    this.creationReview= false;

    const routePath = this.route.snapshot.url[0].path;
    if (routePath.endsWith("-new-flow-review")) {
      // flow creation review
      const ctrForCreation = self.ctrService.getCreationFlow();
      if (!ctrForCreation || !ctrForCreation.clinicalTrial)
        throw new Error("No creation context");
      this.clinicalSites = [];
      this.clinicalTrialDetailObj = ctrForCreation.clinicalTrial;
      this.ecHtml = this.sanitizer.bypassSecurityTrustHtml(this.clinicalTrialDetailObj!.eligibilityCriteria);
      // TODO #14 go for each ctrForCreation.clinicalTrial.clinicalSites
      this.csService.get(ctrForCreation.clinicalTrial.clinicalSite.id).subscribe(
        (cs) => {
          this.clinicalTrialDetailObj!.clinicalSite = cs;
          this.clinicalSites?.push(cs);
          this.creationReview = true;
          this.updateMaps();
        }
      )
      return;
    }
    const ctrId = this.route.snapshot.paramMap.get('id');
    if (!ctrId) {
      // if there is no path parameter, then comes from dashboard
      this.getTrialDetails(localStorage.getItem(ClinicalTrialDetailComponent.SELECTED_ID) || "");
    } else {
      this.getTrialDetails(ctrId);
    }
  }

  ngAfterViewChecked(): void {
    var height = this.eligibilityCriteriaText?.nativeElement.offsetHeight;
    //if (height > 300) {
    //  this.hideEligibilityCriteriaExpanded = false;
    //}
  }

  // Click button for navigation back
  navigateBack(): void {
    console.log("navigateBack ", this.authService.hasClinicalSiteProfile(), this.authService.hasPhysicianProfile(), this.authService.hasSponsorProfile())
    if (this.authService.hasClinicalSiteProfile())
      this.router.navigate(['/dashboard-clinicalsite']);
    else if (this.authService.hasSponsorProfile())
      this.router.navigate(['/dashboard-sponsor']);
    else if (this.authService.hasPhysicianProfile())
      this.router.navigate(['/dashboard-physician']);
    else
      this.router.navigate(['/']);
  }

  // Click button event for expand and collapse of Eligibility Criteria
  expandCollapseEligibityCriteria(): void {
    this.isEligibilityCriteriaExpanded = !this.isEligibilityCriteriaExpanded;
  }

  // API for getting all clinical trial detail
  getTrialDetails(siteId: string): void {
    this.trialDetailService.getTrialDetails(siteId)
      .subscribe(ctr => {
        this.clinicalTrialDetailObj = ctr;
        this.clinicalSites = ctr.clinicalSites;
        this.ecHtml = this.sanitizer.bypassSecurityTrustHtml(this.clinicalTrialDetailObj.eligibilityCriteria);
        this.updateMaps();
        this.clinicalTrialReady.emit(this.clinicalTrialDetailObj);
      }
      );
  }

  // After the response from the API, update the Leaflet Map adding the marker
  private updateMaps(): void {
    const self = this;
    for(let i=0; i<self.clinicalTrialDetailObj!.clinicalSites.length; i++) {
      const mapElName = "map"+i;
      const mapEl = self.document.getElementById(mapElName);
      if (!mapEl) {
        console.log("mapEl "+mapElName+" is undefined - delay"); // angular did not yet added mapN to view. Wait for it.
        setTimeout(() => {
          self.updateMaps();
        }, 100);
        return;
      }
      const cs = this.clinicalTrialDetailObj!.clinicalSites[i];
      //console.log("Creating map "+mapElName+" on site "+cs.name);
      cs.map = L.map(mapElName).setView([51.505, -0.09], 16);
      cs.map.setView([cs.address.location.latitude ?? 0, cs.address.location.longitude ?? 0], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(cs.map);

      const lat = cs.address.location.latitude ?? 0;
      const long = cs.address.location.longitude ?? 0;
      L.marker([lat, long], {
        icon: iconDefault
      }).addTo(cs.map).bindPopup(cs.name ?? '');
    }
  }

  canEdit() : boolean {
    // TODO check trial ownership
    return this.authService.isLoggedIn() && this.authService.hasSponsorProfile();
  }

  btnEdit() {
    this.router.navigateByUrl("/clinicaltrial-edit/"+this.clinicalTrialDetailObj!.id);
  }

  canEditCriteriaGhi() : boolean {
    // TODO check that it is not recruiting
    return this.canEdit();
  }

  btnEditCriteriaGhi() {
    if (this.creationReview) {
      this.router.navigateByUrl("/clinicaltrialquestiontypegroup-ghi-flow");
    } else {
      this.router.navigateByUrl("/clinicaltrialquestiontypegroup-ghi/"+this.clinicalTrialDetailObj!.id);
    }
  }

  canEditCriteriaCondition() : boolean {
    // TODO check that it is not recruiting
    return this.canEdit();
  }

  btnEditCriteriaCondition() {
    if (this.creationReview) {
      this.router.navigateByUrl("/clinicaltrialquestiontypegroup-condition-flow");
    } else {
      this.router.navigateByUrl("/clinicaltrialquestiontypegroup-condition/"+this.clinicalTrialDetailObj!.id);
    }
  }

  canEditCriteriaTrial() : boolean {
    // TODO check that it is not recruiting
    return this.canEdit();
  }

  btnEditCriteriaTrial() {
    if (this.creationReview) {
      this.router.navigateByUrl("/clinicaltrialquestiontypegroup-trial-flow");
    } else {
      this.router.navigateByUrl("/clinicaltrialquestiontypegroup-trial/"+this.clinicalTrialDetailObj!.id);
    }
  }

}
