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
  payLoad = '';

  constructor(
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private ctrService: ClinicalTrialService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({}); // s
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
    this.ctrService.getGhiFormGroup(ctrId, (ghiQtArray, ghiFormGroup)=> {
      self.qtArray = ghiQtArray;
      self.form = ghiFormGroup;
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log("Payload:",this.payLoad);
  }
}
