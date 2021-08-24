import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppComponent } from '../app.component';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { QuestionType } from '../questiontype';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-clinicaltrialquestiontype-group',
  templateUrl: './clinicaltrialquestiontype-group.component.html',
  styleUrls: ['./clinicaltrialquestiontype-group.component.css']
})
export class ClinicalTrialQuestionTypeGroupComponent implements OnInit {

  ctr : any = { id: '', name: '', nctNumber: '' };
  title : string = '';
  @Input() qtArray: QuestionType[] = [];
  form!: FormGroup;
  ctrId: string = '';
  stage: string = "ghi"; // can by ghi, condition or trial - should be an enum

  constructor(
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    public router: Router,
    private ctrService: ClinicalTrialService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.appComponent.sideNavOpened = false,100);
    this.qtArray = [];
    this.form = new FormGroup({}); // s
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Sponsor Dashboard");
    this.fillFromService();
  }

  fillFromService(): void {
    const self = this;
    const routePath = this.route.snapshot.url[0].path;
    if (routePath) {
      if (routePath.endsWith("-condition")) {
        this.stage = "condition";
        this.title = 'Condition-specific Criteria'
      } else if (routePath.endsWith("-ghi")) {
        this.stage = "ghi";
        this.title = 'General Health Information Criteria'
      } else if (routePath.endsWith("-trial")) {
        this.stage = "trial";
        this.title = 'Trial-specific Criteria'
      } else {
        throw "Not found stage for routePath";
      }
    } else {
      throw "No route";
    }
    const ctrId = this.route.snapshot.paramMap.get('id');
    if (!ctrId) {
      throw "request id is null";
    }
    this.ctrId = ctrId;
    console.log("ctrId=", ctrId);
    this.ctrService.get(ctrId).subscribe(
      (ctr) => {
        self.ctr = ctr;
        this.ctrService.getFormGroup(this.ctrId, this.stage, (error, qtArray, formGroup)=> {
          if (error) {
            self.ctr = { id: '', name : 'Could not load ctqt ' + ctrId + "/" + self.stage, nctNumber: error };
            self.qtArray = [];
            self.form = new FormGroup({});
            // TODO how to make the FormGroup invalid ?
          } else {
            self.qtArray = qtArray!;
            self.form = formGroup!;
          }
        });
      },
      (error) => {
        self.ctr = { id: '', name : 'Could not load trial' + ctrId, nctNumber: error };
        self.qtArray = [];
        self.form = new FormGroup({});
        // TODO how to make the FormGroup invalid ?
      }
    );
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
}
