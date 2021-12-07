import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../application.service';
import { Application } from '../application';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})
export class ApplicationDetailComponent implements OnInit {

  app : Application = { id: '?', name: '?', email: '?', matchRequest: {}, clinicalSite: {}, clinicalTrial: {}, createdOn: new Date()}

  constructor(
    private appService: ApplicationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const appId = this.route.snapshot.paramMap.get('id');
    if (!appId) {
      console.log("No id parameter");
      return;
    }
    this.appService.get(appId)
      .subscribe(app => {
        this.app = app;
        console.log("App.email", app.email);
      });
  }

  // Click button for navigation back
  navigateBack(): void {
    console.log("navigateBack ", this.authService.hasClinicalSiteProfile(), this.authService.hasPhysicianProfile(), this.authService.hasSponsorProfile())
    if (this.authService.hasClinicalSiteProfile())
      this.router.navigate(['/dashboard-clinicalsite']);
    else if (this.authService.hasSponsorProfile())
      this.router.navigate(['/dashboard-sponsor']);
    else if (this.authService.hasPhysicianProfile())
      this.router.navigate(['/dashboard-physician']);
    else
      this.router.navigate(['/']);
  }

  // Click button for navigation back
  navigateTrial(): void {
    console.log("navigateTrial ", this.authService.hasClinicalSiteProfile(), this.authService.hasPhysicianProfile(), this.authService.hasSponsorProfile())
    if (this.authService.hasClinicalSiteProfile())
      this.router.navigate(['/clinicaltrial-clinicalsite']);
    else
      this.router.navigate(['/clinicaltrial/']);
  }

}
