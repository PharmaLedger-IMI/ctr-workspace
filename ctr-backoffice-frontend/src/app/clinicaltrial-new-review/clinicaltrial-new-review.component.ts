import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { ClinicalTrialDetailComponent } from '../clinicaltrial-detail/clinicaltrial-detail.component';
import { ClinicalTrialService } from '../clinicaltrial.service';

@Component({
  selector: 'app-clinicaltrial-new-review',
  templateUrl: './clinicaltrial-new-review.component.html',
  styleUrls: ['./clinicaltrial-new-review.component.css']
})
export class ClinicalTrialNewReviewComponent implements OnInit {

  @ViewChild(ClinicalTrialDetailComponent) ctrDetail!: ClinicalTrialDetailComponent;
  btnSubmit: string = "SAVE";
  error = '';
  
  constructor(
    private appComponent: AppComponent, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private ctrService: ClinicalTrialService
  ) { }


  // Breadcrumb navigation back
  navigateBack(): void {
    this.ctrDetail.navigateBack();
  }

  ngOnInit(): void {
    this.error = '';
    const routePath = this.route.snapshot.url[0].path;
    const ctrForCreation = this.ctrService.getCreationFlow();
    if (!ctrForCreation) {
      throw new Error("No clinicaltrial-new-flow-review in progress");
    }
    this.appComponent.setNavMenuHighlight("sponsor", "dashboard", "Confirm Trial");
  }

  onSubmit() {
    const self = this;
    const ctrForCreation = this.ctrService.getCreationFlow();
    if (!ctrForCreation) {
      throw new Error("No clinicaltrial-new-flow-review in progress");
    }
    this.ctrService.postFull(ctrForCreation).subscribe(
      (ctr) => {
        self.router.navigateByUrl("/dashboard-sponsor");
      },
      (error) => {
        this.error = error;
      }
    );
  }

  onBack() {
    console.log("Pressed the back button");
    const self = this;
    self.router.navigateByUrl("/clinicaltrialquestiontypegroup-trial-flow");      
  }
}
