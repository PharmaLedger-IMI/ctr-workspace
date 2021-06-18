import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from '../app.component';
import { Locale } from '../locale';
import { LocaleService } from '../locale.service';
import { AppResource } from '../appresource';
import { AppResourceService } from '../appresource.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  arcCollection: AppResource[] = [];
  locales: Locale[] = [];

  constructor(
    public router: Router,
    private appComponent: AppComponent,
    private authService: AuthService,
    private localeService: LocaleService,
    private arcService: AppResourceService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    const queryParamValue = this.route.snapshot.queryParamMap.get('type') || '';
    if (queryParamValue.length > 0) {
      this.authService.setUserType(this.route.snapshot.queryParamMap.get('type') || '');
    }
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }
    console.log("User Type: "+this.authService.getUserTypeLoginPage());
    this.router.navigate([this.authService.getUserTypeLoginPage()]);
    return;
    this.appComponent.setNavMenuHighlight("admin", "dashboard", "Administration Dashboard");
    this.getAppResources();
    this.getLocales();
  }

  getParamValueQueryString( paramName: string ) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  getLocales(): void {
    this.localeService.getLocales()
      .subscribe(locales => this.locales = locales.slice(1, 5));
  }

  getAppResources(): void {
    this.arcService.getAppResources()
      .subscribe(arcArray => this.arcCollection = arcArray.slice(1, 5));
  }
}
