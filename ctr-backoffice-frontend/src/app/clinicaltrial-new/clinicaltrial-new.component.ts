import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppComponent } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { ClinicalTrialService } from '../clinicaltrial.service';

@Component({
  selector: 'app-clinicaltrial-new',
  templateUrl: './clinicaltrial-new.component.html',
  styleUrls: ['./clinicaltrial-new.component.css']
})
export class ClinicalTrialNewComponent implements OnInit {
  
  // lets try a template-driven form
  ctr: any = {};

  constructor(
    private appComponent: AppComponent, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private ctrService: ClinicalTrialService
  ) { }

  ngOnInit(): void {
    const self = this;
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Adding a new trial");
    this.ctr = {
      sponsor: { 
        id: self.authService.getSponsorId(),
        name: self.authService.getSponsorName()
      }
    };
  }

}
