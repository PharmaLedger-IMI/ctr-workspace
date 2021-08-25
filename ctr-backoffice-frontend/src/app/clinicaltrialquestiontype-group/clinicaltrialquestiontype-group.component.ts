import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppComponent } from '../app.component';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { QuestionType } from '../questiontype';

@Component({
  selector: 'app-clinicaltrialquestiontype-group',
  templateUrl: './clinicaltrialquestiontype-group.component.html',
  styleUrls: ['./clinicaltrialquestiontype-group.component.css']
})
export class ClinicalTrialQuestionTypeGroupComponent implements OnInit {

  ctrBlank : any = { id: '', name: '', nctNumber: '' };
  ctrId: string = '';  // nil UUID is a special case when the clinicaltrial does not yet exists, used only on multiPage
  ctr : any = { id: '', name: '', nctNumber: '' };
  error : string = '';
  form!: FormGroup;
  multiPage: boolean = false; // set to true by multi-page flow entry path
  @Input() qtArray: QuestionType[] = [];
  stage: string = "ghi"; // can by ghi, condition or trial - should be an enum
  title : string = '';

  constructor(
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    public router: Router,
    private ctrService: ClinicalTrialService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.appComponent.sideNavOpened = false,100);
    // reset most stuff to blank
    this.error = '';
    this.ctr = this.ctrBlank;
    this.ctrId = '';
    this.multiPage = false;
    this.qtArray = [];
    this.form = new FormGroup({}); // s
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Sponsor Dashboard");
    this.fillFromService();
  }

  fillFromService(): void {
    const self = this;
    const routePath = this.route.snapshot.url[0].path;
    if (routePath) {
      self.multiPage = routePath.endsWith("-flow");
      if (routePath.endsWith("-condition")||routePath.endsWith("-condition-flow")) {
        self.stage = "condition";
        self.title = 'Condition-specific Criteria'
      } else if (routePath.endsWith("-ghi")||routePath.endsWith("-ghi-flow")) {
        self.stage = "ghi";
        self.title = 'General Health Information Criteria'
      } else if (routePath.endsWith("-trial")||routePath.endsWith("-trial-flow")) {
        self.stage = "trial";
        self.title = 'Trial-specific Criteria'
      } else {
        throw "Not found stage for routePath";
      }
    } else {
      throw "No route";
    }
    const ctrId = self.route.snapshot.paramMap.get('id');
    if (!ctrId && !self.multiPage) {
      throw "request id is null and not multiPage creation";
    }
    if (!ctrId) {
      // must be multiPage
      const ctrForCreation = self.ctrService.getCreationFlow();
      if (!ctrForCreation || !ctrForCreation.clinicalTrial) {
        throw "No clinicaltrial creation in progress";
      }
      self.ctr = ctrForCreation.clinicalTrial;
      this.ctrId = "00000000-0000-0000-0000-000000000000"; // nil UUID is a special case
      this.fillFromGhi();
    } else {
      this.ctrId = ctrId;
      console.log("ctrId=", ctrId);
      this.ctrService.get(ctrId).subscribe(
        (ctr) => {
          self.ctr = ctr;
          self.fillFromGhi();
        },
        (error) => {
          self.error = error;
          self.ctr = this.ctrBlank;
          self.qtArray = [];
          self.form = new FormGroup({});
          // TODO how to make the FormGroup invalid ?
        }
      );
    }
  }

  fillFromGhi() : void {
    const self = this;
    this.ctrService.getFormGroup(this.ctrId, this.stage, (error, qtArray, formGroup) => {
      if (error) {
        self.error = error;
        self.qtArray = [];
        self.form = new FormGroup({});
        // TODO how to make the FormGroup invalid ?
      } else {
        self.qtArray = qtArray!;
        self.form = formGroup!;
        if (self.stage == 'trial' && (!qtArray || qtArray.length == 0)) {
          // absence of questions means that there are no defined questions
          self.error = "There are no defined trial-specific question. Please ask a technician to install those question's definitions!";
        }
      }
    });
  }

  onSubmit() {
    const self = this;
    // An empty formgroup seems to be always valid. Protect against that.
    console.log("fvalid", self.form.valid);
    if (!self.qtArray || self.qtArray.length == 0) {
      self.form.setErrors({ 'incorrect': true });
      // TODO how to make the FormGroup invalid ?
      return;
    }
    if (self.multiPage) {
      self.onSubmitMultiPage()
    } else {
      self.onSubmitSinglePage();
    }
  }

  onSubmitMultiPage() {
    const self = this;
    const ctrForCreation = self.ctrService.getCreationFlow();
    if (!ctrForCreation) {
      this.error = "Trial creation context lost. Please start over again!";
      return;
    }
    this.ctrService.updateCreationFlow(ctrForCreation);
    if (this.stage=="condition") {
      self.router.navigateByUrl("/clinicaltrialquestiontypegroup-trial-flow");
    } else if (this.stage=="ghi") {
      self.router.navigateByUrl("/clinicaltrialquestiontypegroup-condition-flow");
    } else if (this.stage=="trial") {
      self.router.navigateByUrl("/clinicaltrial-new-flow-review");
    }
  }

  onSubmitSinglePage() {
    const self = this;
    self.ctrService.submitQtArray(this.ctrId, this.stage, this.qtArray, this.form).subscribe(
    result => {
      console.log(result);
      self.router.navigateByUrl("/trialdetails/"+self.ctrId);
    }
  );


  }

  onBack() {
    console.log("Pressed the back button");
    if (this.ctr.id)
      this.router.navigateByUrl("/trialdetails/"+this.ctrId);
    else
      this.router.navigateByUrl("/dashboard-sponsor/");
  }

  onNavigateToBrowse(): void {
    console.log("Browse breadcrumb button pressed");
    this.router.navigateByUrl("/dashboard-sponsor");
  }
}
