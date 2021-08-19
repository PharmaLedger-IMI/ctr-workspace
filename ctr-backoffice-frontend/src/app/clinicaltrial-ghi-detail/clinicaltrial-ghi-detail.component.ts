import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppComponent } from '../app.component';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { QuestionType } from '../questiontype';

@Component({
  selector: 'app-clinicaltrial-ghi-detail',
  templateUrl: './clinicaltrial-ghi-detail.component.html',
  styleUrls: ['./clinicaltrial-ghi-detail.component.css']
})
export class ClinicaltrialGhiDetailComponent implements OnInit {

  @Input() qtArray: QuestionType[] = [];
  form!: FormGroup;
  ctrId: string = '';
  stage: string = "ghi"; // can by ghi, condition or trial - should be an enum

  constructor(
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private ctrService: ClinicalTrialService
  ) { }

  ngOnInit(): void {
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
      } else if (routePath.endsWith("-ghi")) {
        this.stage = "ghi";
      } else if (routePath.endsWith("-trial")) {
        this.stage = "trial";
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
    this.ctrService.getFormGroup(this.ctrId, this.stage, (qtArray, formGroup)=> {
      self.qtArray = qtArray;
      self.form = formGroup;
    });
  }

  onSubmit() {
    this.ctrService.submitQtArray(this.ctrId, this.stage, this.qtArray, this.form).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  onBack() {
    console.log("Pressed the back button");
  }
}
