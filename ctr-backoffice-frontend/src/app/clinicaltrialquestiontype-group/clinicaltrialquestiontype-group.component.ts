import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppComponent } from '../app.component';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { GeneralHealthInformationQuestionTypeService } from '../generalhealthinformationquestiontype.service';
import { MedicalConditionQuestionTypeService } from '../medicalconditionquestiontype.service';
import { QuestionType } from '../questiontype';

@Component({
  selector: 'app-clinicaltrialquestiontype-group',
  templateUrl: './clinicaltrialquestiontype-group.component.html',
  styleUrls: ['./clinicaltrialquestiontype-group.component.css']
})
export class ClinicalTrialQuestionTypeGroupComponent implements OnInit {

  addingQtFlag: boolean = false;
  btnText: string = "SAVE";
  ctrBlank: any = { id: '', name: '', nctNumber: '' };
  ctrId: string = '';  // nil UUID is a special case when the clinicaltrial does not yet exists, used only on multiPage
  ctr: any = { id: '', name: '', nctNumber: '' };
  error: string = '';
  form!: FormGroup;
  multiPage: boolean = false; // set to true by multi-page flow entry path
  @Input() qtArray: QuestionType[] = [];
  stage: string = "ghi"; // can by ghi, condition or trial - should be an enum
  title: string = '';

  constructor(
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    public router: Router,
    private ctrService: ClinicalTrialService,
    private ghiqtService: GeneralHealthInformationQuestionTypeService,
    private mcqtService: MedicalConditionQuestionTypeService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.appComponent.sideNavOpened = false, 100);
    // reset most stuff to blank
    this.error = '';
    this.ctr = this.ctrBlank;
    this.ctrId = '';
    this.multiPage = false;
    this.qtArray = [];
    this.form = new FormGroup({ }); // s
    this.addingQtFlag = false;
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Sponsor Dashboard");
    this.fillFromService();
  }

  fillFromService(): void {
    const self = this;
    const routePath = this.route.snapshot.url[0].path;
    if (routePath) {
      self.multiPage = routePath.endsWith("-flow");
      self.btnText = self.multiPage ? "SAVE AND CONTINUE" : "SAVE";
      if (routePath.endsWith("-condition") || routePath.endsWith("-condition-flow")) {
        self.stage = "condition";
        self.title = 'Condition-specific Criteria'
      } else if (routePath.endsWith("-ghi") || routePath.endsWith("-ghi-flow")) {
        self.stage = "ghi";
        self.title = 'General Health Information Criteria'
      } else if (routePath.endsWith("-trial") || routePath.endsWith("-trial-flow")) {
        self.stage = "trial";
        self.title = 'Trial-specific Criteria'
      } else {
        throw "Not found stage for routePath";
      }
    } else {
      throw "No route";
    }
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", self.title);
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
      this.fillFromTemplateOrContext();
    } else {
      this.ctrId = ctrId;
      console.log("ctrId=", ctrId);
      this.ctrService.get(ctrId).subscribe(
        (ctr) => {
          self.ctr = ctr;
          self.fillFromClinicalTrial();
        },
        (error) => {
          self.error = error;
          self.ctr = this.ctrBlank;
          self.qtArray = [];
          self.form = new FormGroup({ });
          // TODO how to make the FormGroup invalid ?
        }
      );
    }
  }

  fillFromClinicalTrial(): void {
    const self = this;
    this.ctrService.getFormGroup(this.ctrId, this.stage, (error, qtArray, formGroup) => {
      if (error) {
        self.error = error;
        self.qtArray = [];
        self.form = new FormGroup({ });
        // TODO how to make the FormGroup invalid ?
      } else {
        self.error = '';
        self.qtArray = qtArray!;
        self.form = formGroup!;
        if (self.stage == 'trial' && (!qtArray || qtArray.length == 0)) {
          // absence of questions means that there are no defined questions
          self.error = "There are no defined trial-specific question. Please ask a technician to install those question's definitions!";
        }
      }
    });
  }

  fillFromTemplateOrContext(): void {
    const self = this;
    const ctrForCreation = self.ctrService.getCreationFlow();
    if (self.stage == "condition") {
      const conditionQtArray = ctrForCreation.condition;
      if (conditionQtArray) { // fetch from creation context
        self.error = '';
        self.qtArray = conditionQtArray;
        self.form = self.ctrService.toFormGroup(conditionQtArray);
      } else { // fetch from template
        if (!self.ctr
          || !Array.isArray(self.ctr.clinicalTrialMedicalConditions)
          || !self.ctr.clinicalTrialMedicalConditions[0].medicalCondition
          || !self.ctr.clinicalTrialMedicalConditions[0].medicalCondition.code
        ) {
          console.log("ctr", self.ctr);
          self.error = "No medical condition specified!";
          self.qtArray = [];
          self.form = new FormGroup({ });
          return;
        }
        const mcCode = self.ctr.clinicalTrialMedicalConditions[0].medicalCondition.code;
        self.mcqtService.get(mcCode).subscribe(
          (qtArray) => {
            self.error = '';
            self.qtArray = qtArray;
            self.form = self.ctrService.toFormGroup(qtArray);
          },
          (error) => {
            self.error = error;
            self.qtArray = [];
            self.form = new FormGroup({ });
          }
        );
      }
    } else if (self.stage == "ghi") {
      const ghiQtArray = ctrForCreation.ghi;
      if (ghiQtArray) { // fetch from creation context
        self.error = '';
        self.qtArray = ghiQtArray;
        self.form = self.ctrService.toFormGroup(ghiQtArray);
      } else { // fetch from template
        self.ghiqtService.get().subscribe(
          (qtArray) => {
            self.error = '';
            self.qtArray = qtArray;
            self.form = self.ctrService.toFormGroup(qtArray);
          },
          (error) => {
            self.error = error;
            self.qtArray = [];
            self.form = new FormGroup({ });
          }
        );
      }
    } else if (self.stage == "trial") {
      const trialQtArray = ctrForCreation.trial;
      if (trialQtArray && trialQtArray.length>=0) { // fetch from creation context
        self.error = '';
        self.qtArray = trialQtArray;
        self.form = self.ctrService.toFormGroup(trialQtArray);
      } else { // fetch from template
        self.fillFromClinicalTrial(); // use the nil UUID
      }
    }
  }

  onSubmit() {
    const self = this;
    // An empty formgroup seems to be always valid. Protect against that.
    console.log("fvalid", self.form.valid);
    if (self.stage != 'trial' && (!self.qtArray || self.qtArray.length == 0)) {
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
    // just store the qtArray in the creation context
    const newQtArray = this.ctrService.newQtArrayFromForm(this.qtArray, this.form);
    if (self.stage == "condition") {
      ctrForCreation.condition = newQtArray;
    } else if (self.stage == "ghi") {
      ctrForCreation.ghi = newQtArray;
    } else if (self.stage == "trial") {
      ctrForCreation.trial = newQtArray;
    }
    self.ctrService.updateCreationFlow(ctrForCreation);
    if (self.stage == "condition") {
      self.router.navigateByUrl("/clinicaltrialquestiontypegroup-trial-flow");
    } else if (self.stage == "ghi") {
      self.router.navigateByUrl("/clinicaltrialquestiontypegroup-condition-flow");
    } else if (self.stage == "trial") {
      // TODO put this somewhere else
      let ec = '';
      ctrForCreation.ghi.forEach((qt: any) => { ec += self.ecPreview(qt); });
      ctrForCreation.condition.forEach((qt: any) => { ec += self.ecPreview(qt); });
      ctrForCreation.trial.forEach((qt: any) => { ec += self.ecPreview(qt); });
      ctrForCreation.clinicalTrial.eligibilityCriteria = '<ul class="eligibilitycriteria-group">'
        + ec +'</ul>';
      self.ctrService.updateCreationFlow(ctrForCreation);
      self.router.navigateByUrl("/clinicaltrial-new-flow-review");
    }
  }

  protected ecPreview(qt: any): string {
    if (qt.criteriaLabel) {
      return '<li><span class="neutral-img"></span>' + qt.criteriaLabel + '</li>';
    } else if (qt.criteria && !qt.criteriaLabel) {
      return '<li><span class="neutral-img"></span>Warning: Missing label for expression ' + qt.criteria + ' on question ' + qt.question + '</li>';
    } else
      return '';
  }

  onSubmitSinglePage() {
    const self = this;
    const newQtArray = self.ctrService.newQtArrayFromForm(this.qtArray, this.form);
    self.ctrService.submitQtArray(this.ctrId, this.stage, newQtArray).subscribe(
      result => {
        console.log(result);
        self.router.navigateByUrl("/trialdetails/" + self.ctrId);
      }
    );
  }

  onBack() {
    console.log("Pressed the back button");
    const self = this;
    if (self.multiPage) {
      if (self.stage == "condition") {
        self.router.navigateByUrl("/clinicaltrialquestiontypegroup-ghi-flow");
      } else if (self.stage == "ghi") {
        self.router.navigateByUrl("/clinicaltrial-new-flow"); // will restart a new trial, but for now no time to code specific case
      } else if (self.stage == "trial") {
        self.router.navigateByUrl("/clinicaltrialquestiontypegroup-condition-flow");
      }
    } else {
      if (self.ctr.id)
        self.router.navigateByUrl("/clinicaltrial/" + this.ctrId);
      else
        self.router.navigateByUrl("/dashboard-sponsor/");
    }
  }

  onNavigateToBrowse(): void {
    console.log("Browse breadcrumb button pressed");
    this.router.navigateByUrl("/dashboard-sponsor");
  }

  canSave(): boolean {
    // special case for trial specific - empty qtArray is allowed
    if (this.stage == "trial")
      return !this.addingQtFlag;
    // general case, there has to be some questions
    return this.form.valid && this.qtArray && this.qtArray.length > 0;
  }

  canAddQt(): boolean {
    if (this.stage == "trial")
      return true;
    return false;
  }

  startAddingQt(): void {
    this.addingQtFlag = true;
  }

  stopAddingQt(): void {
    this.addingQtFlag = false;
  }

  /**
   * Add a new QuestionType at the end of questions.
   * @param qt 
   */
  addQtEvent(qt: QuestionType) {
    const self = this;
    self.addingQtFlag = false;
    self.qtArray.push(qt);
    self.form = self.ctrService.toFormGroup(self.qtArray);
  }
}
