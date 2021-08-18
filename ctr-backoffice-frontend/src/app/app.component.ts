import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { VERSION } from 'src/environments/version';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  sideNavOpened = true;
  sideNavMenu1Item = "";
  sideNavMenu2Item = "login";
  sideTime = new Date();
  v = VERSION;

  // For getting image base url
  imageBaseUrl = environment.imageBaseUrl;

  constructor(
    private titleService: Title,
    private cdRef: ChangeDetectorRef,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    
  }

  public setNavMenuHighlight(menu1 : string, menu2 : string, aTitle? : string) {
    this.sideNavMenu1Item = menu1;
    this.sideNavMenu2Item = menu2;
    this.sideTime = new Date();
    this.title = aTitle || "Clinical Trials Recruitment Backoffice";
    if (aTitle && !aTitle.startsWith("Clinical ")) {
      this.titleService.setTitle("Clinical Trials Recruitment Backoffice - "+aTitle);
    } else {
      this.titleService.setTitle(this.title);
    }
    this.cdRef.detectChanges(); // avoid error NG0100: ExpressionChangedAfterItHasBeenCheckedError
    if (this.authService.isLoggedOut()) { // Temporary for hiding side navigation if user is not logged in 
      this.sideNavOpened = false;
    }
  }

  public logout() {
    this.authService.logout();
    this.setNavMenuHighlight("", "login");
    this.sideNavOpened = false; // Hide the navigation bar
  }
}
