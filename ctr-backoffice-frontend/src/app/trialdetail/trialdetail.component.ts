import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { TrialdetailService } from '../trialdetail.service';
import { DashboardPhysicianComponent } from '../dashboard-physician/dashboard-physician.component';
import { ClinicalTrialListResults } from '../dashboard-physician/clinicaltriallist.model';

@Component({
  selector: 'app-trialdetail',
  templateUrl: './trialdetail.component.html',
  styleUrls: ['./trialdetail.component.css']
})
export class TrialdetailComponent implements OnInit {

  clinicalTrialDetailObj?: ClinicalTrialListResults;

  constructor(private location: Location,
    private trialDetailService: TrialdetailService) { }

  ngOnInit(): void {
    console.log("SiteId: " + localStorage.getItem(DashboardPhysicianComponent.SELECTED_SITE_ID));
    this.getTrialDetails(localStorage.getItem(DashboardPhysicianComponent.SELECTED_SITE_ID) || "");
  }

  navigateBack(): void {
    this.location.back();
  }

  // API for getting all clinical trial detail
  getTrialDetails(siteId: string): void {
    this.trialDetailService.getTrialDetails(siteId)
      .subscribe(clinicalTrialStatus => {
        this.clinicalTrialDetailObj = clinicalTrialStatus;
        console.log("Value: "+this.clinicalTrialDetailObj?.name);
      }
      );
  }

}
