import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { TrialdetailService } from '../trialdetail.service';
import { DashboardPhysicianComponent } from '../dashboard-physician/dashboard-physician.component';
import { ClinicalTrialListClinicalSite, ClinicalTrialListResults } from '../dashboard-physician/clinicaltriallist.model';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [22, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-trialdetail',
  templateUrl: './trialdetail.component.html',
  styleUrls: ['./trialdetail.component.css']
})
export class TrialdetailComponent implements AfterViewInit {

  // Main object for entire clinical trial details
  clinicalTrialDetailObj?: ClinicalTrialListResults;

  // Array for showing multiple clinical sites in the map
  clinicalSites?: ClinicalTrialListClinicalSite[];

  // Leaflet map
  private map?: L.Map;

  // Boolean variables for eligibility criteria
  isEligibilityCriteriaExpanded = false;
  hideEligibilityCriteriaExpanded = true;

  @ViewChild('eligibilityCriteriaText')
  eligibilityCriteriaText: ElementRef | undefined;

  constructor(private location: Location,
    private trialDetailService: TrialdetailService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngAfterViewInit(): void {
    this.initMap();
    const ctrId = this.route.snapshot.paramMap.get('id');
    if (!ctrId) {
      // if there is no path parameter, then comes from dashboard
      this.getTrialDetails(localStorage.getItem(DashboardPhysicianComponent.SELECTED_SITE_ID) || "");
    } else {
      this.getTrialDetails(ctrId);
    }
  }

  ngAfterViewChecked(): void {
    var height = this.eligibilityCriteriaText?.nativeElement.offsetHeight;
    if (height > 300) {
      this.hideEligibilityCriteriaExpanded = false;
    }
  }

  // Click button for navigation back
  navigateBack(): void {
    this.location.back();
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

    L.marker([this.clinicalTrialDetailObj?.clinicalSite?.address.location.latitude ?? 0, this.clinicalTrialDetailObj?.clinicalSite?.address.location.longitude ?? 0]).addTo(this.map!)
      .bindPopup(this.clinicalTrialDetailObj?.clinicalSite?.name ?? '')
  }

  // Initialize the map with dummy longitude and latitude values
  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 16);
  }

  btnEdit() {
    this.router.navigateByUrl("/clinicaltrial-edit/"+this.clinicalTrialDetailObj!.id);
  }
}
