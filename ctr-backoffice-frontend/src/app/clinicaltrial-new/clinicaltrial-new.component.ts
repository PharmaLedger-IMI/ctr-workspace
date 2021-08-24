import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  error: string = '';
  ctrId: string = ''; // if set, then being used to edit (not create)
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
    private router: Router,
    private csService: ClinicalsiteService,
    private ctrService: ClinicalTrialService,
    private mcService: MedicalConditionService
  ) { }

  ngOnInit(): void {
    const self = this;
    setTimeout(() => this.appComponent.sideNavOpened = false,100);
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Adding a new trial");
    if (!this.authService.hasSponsorProfile())
      throw 'No sponsor profile';
    this.error = '';
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

    const ctrId = this.route.snapshot.paramMap.get('id');
    if (ctrId) {
      this.ctrService.get(ctrId).subscribe(
        (ctr) => {
          self.ctrId = ctrId;
          self.ctr = ctr;
          console.log("Fetch ctr", ctr);
        },
        (error) => {
          console.log("CTR ERR", error);
          this.error = error;
        }
      );
    }
  }

  onSubmit(): void {
    console.log("SAVE button pressed", this.ctrId);
    if (this.ctrId) {
      this.update();
    } else {
      this.create();
    }
  }

  protected create() {
    this.ctr.description = this.ctr.name;
    this.ctr.eligibilityCriteria = "To be defined...";
    this.ctr.status = {
      code: "DRA"
    };
    this.ctrService.post(this.ctr)
        .subscribe( (ctr) => {
            console.log("Created", ctr);
        },
        (error) => {
            console.log("CTR ERR", error);
            this.error = error;
        });
  }

  protected update() {
    this.ctr.description = this.ctr.name;
    this.ctrService.put(this.ctr)
        .subscribe( (ctr) => {
            console.log("Updated", ctr);
            this.router.navigateByUrl("/trialdetails/"+ctr.id);
        },
        (error) => {
            console.log("CTR ERR", error);
            this.error = error;
        });
  }

  onBack(): void {
    console.log("Back button pressed");
    if (this.ctrId)
      this.router.navigateByUrl("/trialdetails/"+this.ctrId);
    else
      this.router.navigateByUrl("/dashboard-sponsor");
  }

  onNavigateToBrowse(): void {
    console.log("Browse breadcrumb button pressed");
    this.router.navigateByUrl("/dashboard-sponsor");
  }
}
