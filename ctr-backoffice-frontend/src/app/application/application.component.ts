import { AotCompiler } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { ApplicationQuery } from '../applicationQuery';
import { AuthService } from '../auth/auth.service';
import { PaginatedDto } from '../paginated.dto';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  
  @Input() ctrId: string = '';

  @Input() displayedColumns: string[] = ['name', 'email', 'clinicalSite', 'clinicalTrial', 'sponsor', 'createdOn', 'viewMore'];

  // For getting image base url
  imageBaseUrl = environment.imageBaseUrl;

  @Input() pageSize: number = 5;
  
  paginatedApps: PaginatedDto<ApplicationQuery, Application> = { count: 0, query: new ApplicationQuery(), results: []};

  @Input() title: string = "My Applications";

  constructor(
    private appService: ApplicationService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnChanges(): void {
    if (this.authService.hasSponsorProfile()) {
      this.router.navigate(['/dashboard-sponsor']);
    }
    const routePath = this.route.snapshot.url[0].path;
    if (routePath.endsWith("-clinicalsite")) {
      this.removeDisplayColumn("clinicalSite");
    }
    this.changeLimitAndPage(this.pageSize,0);
  }

  ngOnInit(): void {
    this.ngOnChanges();
  }

  changeCurrentPage(event: PageEvent) {
    this.changeLimitAndPage(event.pageSize, event.pageIndex);
  }

  changeLimitAndPage(pageSize: number, pageIndex: number) {
    const appQuery = new ApplicationQuery();
    appQuery.clinicalTrialId = this.ctrId;
    appQuery.clinicalSiteId = this.authService.getClinicalSiteId(); // gives undefined if the current user is not from a ClinicalSite
    //if (appQuery.clinicalSite)
    //  this.removeDisplayColumn("clinicalSite");
    appQuery.sponsorId = this.authService.getSponsorId(); // TODO // gives undefined if the current user is not from a Sponsor
    //if (appQuery.sponsor)
    //  this.removeDisplayColumn("sponsor");
    appQuery.limit = pageSize;
    appQuery.page = pageIndex;
    this.appService.getAll(appQuery).subscribe((results) => {
      console.log("getAll", results);
      this.paginatedApps = results;
    });
  }

  // View More Button Pressed - to re-direct to the application detail screen
  viewMorePressed(appId: string) {
    this.router.navigate(['/application/'+appId]);
  }

  removeDisplayColumn(colName : string) {
    console.log("Hidding column", colName);
    const index = this.displayedColumns.indexOf(colName);
    if (index > -1) {
      this.displayedColumns.splice(index, 1);
    }
    console.log("Hidding column", colName, this.displayedColumns);
  }
}
