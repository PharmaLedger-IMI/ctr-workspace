import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
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

  creationReview: boolean = false;

  // Main object for entire clinical trial details
  clinicalTrialDetailObj?: ClinicalTrialListResults;

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

  constructor(private location: Location,
    private trialDetailService: TrialdetailService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private csService: ClinicalsiteService,
    private ctrService: ClinicalTrialService,
    ) { }

  ngAfterViewInit(): void {
    const self = this;
    this.creationReview= false;
    this.initMap();

    const routePath = this.route.snapshot.url[0].path;
    if (routePath.endsWith("-new-flow-review")) {
      // flow creation review
      const ctrForCreation = self.ctrService.getCreationFlow();
      if (!ctrForCreation || !ctrForCreation.clinicalTrial)
        throw new Error("No creation context");
      this.clinicalSites = [];
      this.clinicalTrialDetailObj = ctrForCreation.clinicalTrial;
      this.ecHtml = this.sanitizer.bypassSecurityTrustHtml(this.clinicalTrialDetailObj!.eligibilityCriteria);
      this.csService.get(ctrForCreation.clinicalTrial.clinicalSite.id).subscribe(
        (cs) => {
          this.clinicalTrialDetailObj!.clinicalSite = cs;
          this.clinicalSites?.push(cs);
          this.creationReview = true;
          this.updateMap();
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
      .subscribe(clinicalTrialStatus => {
        this.clinicalSites = [];
        this.clinicalTrialDetailObj = clinicalTrialStatus;
        this.clinicalSites?.push(this.clinicalTrialDetailObj.clinicalSite)
        this.ecHtml = this.sanitizer.bypassSecurityTrustHtml(this.clinicalTrialDetailObj.eligibilityCriteria);
        this.updateMap();
      }
      );
  }

  // After the response from the API, update the Leaflet Map adding the marker
  private updateMap(): void {
    this.map?.setView([this.clinicalTrialDetailObj?.clinicalSite?.address.location.latitude ?? 0, this.clinicalTrialDetailObj?.clinicalSite?.address.location.longitude ?? 0], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map!);

    const lat = this.clinicalTrialDetailObj?.clinicalSite?.address.location.latitude ?? 0;
    const long = this.clinicalTrialDetailObj?.clinicalSite?.address.location.longitude ?? 0;
    L.marker([lat, long], {
      icon: iconDefault
    }).addTo(this.map!).bindPopup(this.clinicalTrialDetailObj?.clinicalSite?.name ?? '');
  }

  // Initialize the map with dummy longitude and latitude values
  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 16);
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
    this.router.navigateByUrl("/clinicaltrialquestiontypegroup-ghi/"+this.clinicalTrialDetailObj!.id);
  }

  canEditCriteriaCondition() : boolean {
    // TODO check that it is not recruiting
    return this.canEdit();
  }

  btnEditCriteriaCondition() {
    this.router.navigateByUrl("/clinicaltrialquestiontypegroup-condition/"+this.clinicalTrialDetailObj!.id);
  }

  canEditCriteriaTrial() : boolean {
    // TODO check that it is not recruiting
    return this.canEdit();
  }

  btnEditCriteriaTrial() {
    this.router.navigateByUrl("/clinicaltrialquestiontypegroup-trial/"+this.clinicalTrialDetailObj!.id);
  }

}
