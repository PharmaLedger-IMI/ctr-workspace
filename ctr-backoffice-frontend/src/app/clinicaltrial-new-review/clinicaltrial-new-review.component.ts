import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { ClinicalTrialService } from '../clinicaltrial.service';

@Component({
  selector: 'app-clinicaltrial-new-review',
  templateUrl: './clinicaltrial-new-review.component.html',
  styleUrls: ['./clinicaltrial-new-review.component.css']
})
export class ClinicalTrialNewReviewComponent implements OnInit {

  btnSubmit: string = "SAVE";

  constructor(
    private appComponent: AppComponent, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private ctrService: ClinicalTrialService
  ) { }

  ngOnInit(): void {
    const routePath = this.route.snapshot.url[0].path;
    const ctrForCreation = this.ctrService.getCreationFlow();
    if (!ctrForCreation) {
      throw "No clinicaltrial-new-flow-review in progress";
    }
  }

  onSubmit() {
    const self = this;
  }

  onBack() {
    console.log("Pressed the back button");
    const self = this;
    self.router.navigateByUrl("/clinicaltrialquestiontypegroup-trial-flow");      
  }
}
