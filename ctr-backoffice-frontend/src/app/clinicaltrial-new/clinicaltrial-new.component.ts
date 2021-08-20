import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppComponent } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { ClinicalsiteService } from '../clinicalsite.service';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { MedicalCondition } from '../medicalcondition';
import { MedicalConditionService } from '../medicalcondition.service';

@Component({
  selector: 'app-clinicaltrial-new',
  templateUrl: './clinicaltrial-new.component.html',
  styleUrls: ['./clinicaltrial-new.component.css']
})
export class ClinicalTrialNewComponent implements OnInit {
  
  // lets try a template-driven form
  ctr: any = {
    clinicalSite: {
       id: ''
    },
    clinicalTrialMedicalConditions: [
      {
        ordering: 10100, // some default order number
        medicalCondition: {
          code: ''
        }
      }
    ]
  };
  csCollection: any[] = [];
  mcCollection: MedicalCondition[] = [];

  constructor(
    private appComponent: AppComponent, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private csService: ClinicalsiteService,
    private ctrService: ClinicalTrialService,
    private mcService: MedicalConditionService
  ) { }

  ngOnInit(): void {
    const self = this;
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Adding a new trial");
    this.ctr = {
      sponsor: { 
        id: self.authService.getSponsorId(),
        name: self.authService.getSponsorName()
      },
      clinicalSite: {
        id: ''
      },
      clinicalTrialMedicalConditions: [
        {
          ordering: 10100, // some default order number
          medicalCondition: {
            code: ''
          }
        }
      ]
    };
    this.csService.getClinicalSites().subscribe( (csArray) => {
      this.csCollection = csArray;
      console.log("csList=", this.csCollection);
    });
    this.mcService.getAll().subscribe( (mcArray) => {
      this.mcCollection = mcArray;
      console.log("mcList=", this.mcCollection);
    });
  }

  onSubmit(): void {
    console.log("SAVE button pressed");
    this.ctr.description = this.ctr.name;
    this.ctr.eligibilityCriteria = "To be defined...";
    this.ctr.status = {
      code: "DRA"
    };
    this.ctrService.post(this.ctr).subscribe( (ctr) => {
      console.log("Created", ctr);
    })
  }

  onBack(): void {
    console.log("Back button pressed");
  }
}
