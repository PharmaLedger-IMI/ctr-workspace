import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { Locale } from '../locale';
import { LocaleService } from '../locale.service';
import { AppResource } from '../appresource';
import { AppResourceService } from '../appresource.service';
import { AuthService } from '../auth/auth.service';


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
    private arcService: AppResourceService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }
    this.appComponent.setNavMenuHighlight("admin", "dashboard", "Administration Dashboard");
    this.getAppResources();
    this.getLocales();
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
