import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { ClinicalsiteService } from '../clinicalsite.service';
import { ClinicalTrialService } from '../clinicaltrial.service';
import { ClinicalTrialStatusService } from '../clinicaltrialstatus.service';
import { ClinicalTrialListStatus } from '../dashboard-physician/clinicaltriallist.model';
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
    ],
    status: {
      code: 'DRA',
      description: 'Draft'
    }
  };
  ctrBlank: any = this.ctr;
  ctrsCollection: ClinicalTrialListStatus[] = [];
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
    private ctrsService: ClinicalTrialStatusService,
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
      ],
      status: {
        code: 'DRA',
        description: 'Draft'
      }
    };
    this.mcCode='';
    this.csService.getClinicalSites().subscribe( (csArray) => {
      this.csCollection = csArray;
      console.log("csList=", this.csCollection);
    });
    this.csService.getClinicalSites().subscribe( (csArray) => {
      this.csCollection = csArray;
      console.log("csList=", this.csCollection);
    });
    this.ctrsService.getAll().subscribe( (ctrsArray) => {
      this.ctrsCollection = ctrsArray;
      console.log("ctrsArray=", this.ctrsCollection);
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
      } else if (routePath.endsWith("-new-flow") || routePath.endsWith("-new-flow-start")) {
        this.multiPage = true;
        this.btnSubmit = "CONTINUE";
        if (routePath.endsWith("-new-flow-start")) {
          self.ctrId = '';
          const ctrForCreation = self.ctrService.initCreationFlow(self.ctr);
          if (!ctrForCreation)
            throw new Error("No creation context on start");
          console.log("ctrForCreation", ctrForCreation);
          self.router.navigateByUrl("/clinicaltrial-new-flow");
          return;
        } else {
          self.ctrId = '';
          const ctrForCreation = self.ctrService.getCreationFlow();
          if (!ctrForCreation)
            throw new Error("No creation context on -new-flow");
          self.ctr = ctrForCreation.clinicalTrial;
          self.mcCode = self.ctr.clinicalTrialMedicalConditions[0].medicalCondition.code;
          console.log("ctr", self.ctr);
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
      if (!routePath.endsWith("-edit"))
        throw new Error("path param id only for -edit");
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
      this.update(); // single page edit
    } else {
      this.create(); // single or multiPage flow
    }
  }

  protected create() {
    const self = this;
    // this is a redundant check that mcCode was not hacked
    self.ctr.description = this.ctr.name;
    self.ctr.eligibilityCriteria = "To be defined...";
    // Override status
    self.ctr.status = {
      code: "DRA",
      description: "Draft"
    };
    const mcFound = self.mcCollection.find((mc)=>self.mcCode==mc.code);
    if (!mcFound) {
      // mcCode not found in list of possible mcCodes
      self.error="Medical condition missing (or missing condition questions)!"
      return;
    }
    self.ctr.clinicalTrialMedicalConditions[0].medicalCondition = mcFound;
    if (self.multiPage) {
      const ctrForCreation = self.ctrService.getCreationFlow();
      if (!ctrForCreation || !ctrForCreation.clinicalTrial)
        throw new Error("No creation context");
      ctrForCreation.clinicalTrial = self.ctr;
      self.ctrService.updateCreationFlow(ctrForCreation);
      self.router.navigateByUrl("/clinicaltrialquestiontypegroup-ghi-flow");
    } else {
      self.ctrService.post(this.ctr)
        .subscribe(
          (ctr) => {
            console.log("Created", ctr);
            self.router.navigateByUrl("/clinicaltrial/" + ctr.id);
          },
          (error) => {
            console.log("CTR ERR", error);
            self.error = error;
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
    const ctrsFound = self.ctrsCollection.find((ctrs)=>self.ctr.status.code==ctrs.code);
    if (!ctrsFound) {
      // ctr.status.code not found in list of possible ctrsCodes
      self.error="Status missing (or missing possible statuses)!"
      return;
    }
    self.ctr.status.description = ctrsFound.description;
    this.ctrService.put(this.ctr)
      .subscribe(
        (ctr) => {
          console.log("Updated", ctr);
          this.router.navigateByUrl("/clinicaltrial/" + ctr.id);
        },
        (error) => {
          console.log("CTR ERR", error);
          this.error = error;
        });
  }

  onBack(): void {
    console.log("Back button pressed");
    if (this.ctrId)
      this.router.navigateByUrl("/clinicaltrial/"+this.ctrId);
    else
      this.router.navigateByUrl("/dashboard-sponsor");
  }

  onNavigateToBrowse(): void {
    console.log("Browse breadcrumb button pressed");
    this.router.navigateByUrl("/dashboard-sponsor");
  }
}
