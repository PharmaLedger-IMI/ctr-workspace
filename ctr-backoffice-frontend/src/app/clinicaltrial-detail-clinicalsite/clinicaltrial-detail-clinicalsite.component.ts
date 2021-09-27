import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ApplicationComponent } from '../application/application.component';
import { ClinicalTrialDetailComponent } from '../clinicaltrial-detail/clinicaltrial-detail.component';
import { ClinicalTrialListResults } from '../dashboard-physician/clinicaltriallist.model';

/**
 * A container for clinicaltrial-detail when used for a clinicalsite, 
 * which also displays applications to the trial.
 */
@Component({
  selector: 'app-clinicaltrial-detail-clinicalsite',
  templateUrl: './clinicaltrial-detail-clinicalsite.component.html',
  styleUrls: ['./clinicaltrial-detail-clinicalsite.component.css'],
})
export class ClinicalTrialDetailClinicalSiteComponent implements OnInit {

  @ViewChild(ApplicationComponent) apps!: ApplicationComponent;
  @ViewChild(ClinicalTrialDetailComponent) ctrDetail!: ClinicalTrialDetailComponent;
  
  ctrId: string = '';
  ctrName: string = '';
  title: string = 'My applications';

  constructor() { }

  ngOnInit(): void {
    this.ctrId = localStorage.getItem(ClinicalTrialDetailComponent.SELECTED_ID) || "";
  }

  navigateBack(): void {
    this.ctrDetail.navigateBack();
  }

  readyClinicalTrial(event: ClinicalTrialListResults) {
    this.ctrId = event.id;
    this.ctrName = event.name;
    this.title = "Applications for "+this.ctrName;
    this.apps.ctrId = this.ctrId;
  }
}
