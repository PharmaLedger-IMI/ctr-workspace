import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  isEligibilityCriteriaExpanded = false;
  hideEligibilityCriteriaExpanded = true;

  @ViewChild('eligibilityCriteriaText')
  eligibilityCriteriaText: ElementRef | undefined;

  constructor(private location: Location,
    private trialDetailService: TrialdetailService) { }

  ngOnInit(): void {
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
        this.clinicalTrialDetailObj = clinicalTrialStatus;
        
      }
      );
  }

}
