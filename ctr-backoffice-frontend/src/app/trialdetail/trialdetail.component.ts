import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { TrialdetailService } from '../trialdetail.service';
import { DashboardPhysicianComponent } from '../dashboard-physician/dashboard-physician.component';
import { ClinicalTrialListClinicalSite, ClinicalTrialListResults } from '../dashboard-physician/clinicaltriallist.model';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [32, 45],
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

  clinicalTrialDetailObj?: ClinicalTrialListResults;

  clinicalSites?: ClinicalTrialListClinicalSite[];

  private map?: L.Map;

  isEligibilityCriteriaExpanded = false;
  hideEligibilityCriteriaExpanded = true;

  @ViewChild('eligibilityCriteriaText')
  eligibilityCriteriaText: ElementRef | undefined;

  constructor(private location: Location,
    private trialDetailService: TrialdetailService) { }

    ngAfterViewInit(): void {
      this.initMap();
      this.getTrialDetails(localStorage.getItem(DashboardPhysicianComponent.SELECTED_SITE_ID) || "");
    
  }

  ngAfterViewChecked(): void {
    var height = this.eligibilityCriteriaText?.nativeElement.offsetHeight;
    if (height > 300) {
      this.hideEligibilityCriteriaExpanded = false;
    }
  }

  navigateBack(): void {
    this.location.back();
  }

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

  private updateMap(): void {
    this.map?.setView([this.clinicalTrialDetailObj?.clinicalSite?.address.location.latitude ?? 0, this.clinicalTrialDetailObj?.clinicalSite?.address.location.longitude ?? 0], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map!);

    L.marker([this.clinicalTrialDetailObj?.clinicalSite?.address.location.latitude ?? 0, this.clinicalTrialDetailObj?.clinicalSite?.address.location.longitude ?? 0]).addTo(this.map!  )
    .bindPopup(this.clinicalTrialDetailObj?.clinicalSite?.name ?? '')
  }

  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 16);
  }

}
