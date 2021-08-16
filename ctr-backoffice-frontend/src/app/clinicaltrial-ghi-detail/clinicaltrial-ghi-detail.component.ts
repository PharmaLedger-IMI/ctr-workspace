import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppComponent } from '../app.component';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { QuestionType } from '../questiontype';
import { QuestionControlService } from '../question-control.service';

@Component({
  selector: 'app-clinicaltrial-ghi-detail',
  templateUrl: './clinicaltrial-ghi-detail.component.html',
  styleUrls: ['./clinicaltrial-ghi-detail.component.css']
})
export class ClinicaltrialGhiDetailComponent implements OnInit {

  @Input() qtArray: QuestionType[] = [];
  form!: FormGroup;
  payLoad = '';

  constructor(
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private ctrService: ClinicalTrialService,
    private qtControlService: QuestionControlService
  ) { }

  ngOnInit(): void {
    this.form = this.qtControlService.toFormGroup(this.qtArray); // s
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Sponsor Dashboard");
    this.getGhi();
  }

  getGhi(): void {
    const self = this;
    const ctrId = this.route.snapshot.paramMap.get('id');
    if (!ctrId) {
      console.log("request id is null");
      return;
    }
    console.log("ctrId=", ctrId);
    this.ctrService.getGhiQtArray(ctrId).subscribe(ghiQtArray => {
      console.log(ghiQtArray);
      self.qtArray = ghiQtArray;
      self.form = this.qtControlService.toFormGroup(this.qtArray);
      /*
      let group = self.qtControlService.toFormGroup(self.questions);
      for (let prop in group) {
        console.log("Adding question "+prop);
        if (Object.prototype.hasOwnProperty.call(group, prop)) {
            self.form.addControl(prop, group[prop]);
        }
      }
      */
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log("Payload:",this.payLoad);
  }
}
