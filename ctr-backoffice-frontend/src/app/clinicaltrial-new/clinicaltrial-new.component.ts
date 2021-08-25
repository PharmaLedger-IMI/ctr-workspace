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
  
  btnSubmit: string = "SAVE";
  ctrId: string = ''; // if set, then being used to edit (not create)
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
  ctrBlank: any = this.ctr;
  csCollection: any[] = [];
  error: string = '';
  mcCode: string = '';
  mcCodeBeforeEdit: string = '';
  mcCollection: MedicalCondition[] = [];
  multiPage: boolean = false;

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
    this.mcCode='';
    this.csService.getClinicalSites().subscribe( (csArray) => {
      this.csCollection = csArray;
      console.log("csList=", this.csCollection);
    });
    this.mcService.getAllWithQuestionType().subscribe( (mcArray) => {
      this.mcCollection = mcArray;
      console.log("mcList=", this.mcCollection);
    });

    const routePath = this.route.snapshot.url[0].path;
    if (routePath) {
      if (routePath.endsWith("-new")) {
        // simple, one page workflow
        this.multiPage = false;
        this.btnSubmit = "SAVE";
      } else if (routePath.endsWith("-new-flow")) {
        this.multiPage = true;
        this.btnSubmit = "CONTINUE";
      } else if (routePath.endsWith("-new-flow-review")) {
        this.multiPage = true;
        this.btnSubmit = "CONTINUE";
        const ctrForCreation = this.ctrService.getCreationFlow();
        if (!ctrForCreation) {
          throw "No clinicaltrial-new-flow-review in progress";
        }
        this.ctr = ctrForCreation.clinicalTrial;
        if (this.ctr) {
          throw "No clinicaltrial-new-flow-review in progress";
        }
      } else if (routePath.endsWith("-edit")) {
        this.multiPage = false;
        this.btnSubmit = "SAVE";
      } else {
        throw "Not found suffix for routePath";
      }
    } else {
      throw "No route";
    }

    const ctrId = this.route.snapshot.paramMap.get('id');
    if (ctrId) {
      this.ctrService.get(ctrId).subscribe(
        (ctr) => {
          self.ctrId = ctrId;
          self.ctr = ctr;
          self.mcCode = ctr.clinicalTrialMedicalConditions[0].medicalCondition.code;
          self.mcCodeBeforeEdit = self.mcCode;
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
    console.log(this.mcCode);
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
    if (this.multiPage) {
      this.ctrService.initCreationFlow(this.ctr);
      this.router.navigateByUrl("/clinicaltrialquestiontypegroup-ghi-flow");
    } else {
      this.ctrService.post(this.ctr)
        .subscribe(
          (ctr) => {
            console.log("Created", ctr);
            this.router.navigateByUrl("/trialdetails/" + ctr.id);
          },
          (error) => {
            console.log("CTR ERR", error);
            this.error = error;
          });
    }
  }

  protected update() {
    const self = this;
    self.ctr.description = self.ctr.name;
    const mcFound = self.mcCollection.find((mc)=>self.mcCode==mc.code);
    if (!mcFound) {
      // mcCode not found in list of possible mcCodes
      self.error="Medical condition missing (or missing condition questions)!"
      return;
    }
    if (self.mcCode!=self.mcCodeBeforeEdit) {
      // handle mcCode change
      self.ctr.clinicalTrialMedicalConditions[0].medicalCondition = mcFound;
      console.log("Changed clinicalTrialMedicalConditions old "+self.mcCodeBeforeEdit+" new "+self.mcCode,  self.ctr.clinicalTrialMedicalConditions);
    }
    this.ctrService.put(this.ctr)
      .subscribe(
        (ctr) => {
          console.log("Updated", ctr);
          this.router.navigateByUrl("/trialdetails/" + ctr.id);
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
