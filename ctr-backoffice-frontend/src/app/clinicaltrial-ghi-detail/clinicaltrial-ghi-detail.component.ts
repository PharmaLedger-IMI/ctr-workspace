import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';
import { ClinicalTrialService } from '../clinicaltrial.service';

@Component({
  selector: 'app-clinicaltrial-ghi-detail',
  templateUrl: './clinicaltrial-ghi-detail.component.html',
  styleUrls: ['./clinicaltrial-ghi-detail.component.css']
})
export class ClinicaltrialGhiDetailComponent implements OnInit {

  constructor(
        private appComponent: AppComponent,
        private route: ActivatedRoute,
        private ctrService: ClinicalTrialService
  ) { }

  ngOnInit(): void {
      this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Sponsor Dashboard");
      this.getGhi();
  }
  
  getGhi(): void {
      const ctrId = this.route.snapshot.paramMap.get('id');
      if (!ctrId) {
        console.log("request id is null");
        return;
      }
      console.log("ctrId=",ctrId);
      this.ctrService.getGhiQtArray(ctrId).subscribe(ghiQtArray => { console.log(ghiQtArray); });
  }

}
