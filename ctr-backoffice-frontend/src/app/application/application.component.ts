import { AotCompiler } from '@angular/compiler';
import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { ApplicationQuery } from '../applicationQuery';
import { AuthService } from '../auth/auth.service';
import { CsvDataService } from '../csvdata.service';
import { PaginatedDto } from '../paginated.dto';
import {MatSort, Sort, SortDirection} from "@angular/material/sort";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @Input() ctrId: string = '';

  @Input() displayedColumns: string[] = ['name', 'email', 'phone', 'clinical_site', 'clinical_trial', 'sponsor', 'created_on', 'viewMore'];

  // For getting image base url
  imageBaseUrl = environment.imageBaseUrl;

  @Input() pageSize: number = 5;

  paginatedApps: PaginatedDto<ApplicationQuery, Application> = { count: 0, query: new ApplicationQuery(), results: []};

  @Input() title: string = "My Referrals";

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  sortDirection: SortDirection = 'desc';
  sortProperty = 'created_on';

  constructor(
    private appService: ApplicationService,
    public authService: AuthService,
    private csvService: CsvDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnChanges(): void {
    if (this.authService.hasSponsorProfile()) {
      this.router.navigate(['/dashboard-sponsor']);
    }
    const routePath = this.route.snapshot.url[0].path;
    if (routePath.endsWith("-clinicalsite")) {
      this.removeDisplayColumn("clinical_site");
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
    appQuery.sortDirection = this.sortDirection.toUpperCase();
    appQuery.sortProperty = this.sortProperty.toUpperCase();
    this.appService.getAll(appQuery).subscribe((results) => {
      console.log("getAll", results);
      this.paginatedApps = results;
    });
  }

  exportToCsv() {
    // based on https://stackoverflow.com/questions/51487689/angular-5-how-to-export-data-to-csv-file
    const appQuery = new ApplicationQuery();
    if (!this.paginatedApps || this.paginatedApps.count == 0)
      return;
    appQuery.clinicalTrialId = this.paginatedApps.query.clinicalTrialId;
    appQuery.clinicalSiteId = this.paginatedApps.query.clinicalSiteId; // gives undefined if the current user is not from a ClinicalSite
    appQuery.sponsorId = this.paginatedApps.query.sponsorId; // TODO // gives undefined if the current user is not from a Sponsor
    appQuery.limit = 10000; // lets hope that the browser handles 10000 lines ok.
    appQuery.page = 0;
    appQuery.sortDirection = this.sortDirection.toUpperCase();
    appQuery.sortProperty = this.sortProperty.toUpperCase();
    this.appService.getAll(appQuery).subscribe((results) => {
      const items: any[] = [];
      results.results.forEach((app: Application) => {
        let csvLine: any = {
          Name: app.name,
          Email: app.email,
          Phone: app.phone,
          Trial: app.clinicalTrial.name,
          createdOn: app.createdOn
        }
        items.push(csvLine);
      });
      this.csvService.exportToCsv('referrals.csv', items);
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

  handleSortData(event: Sort): void {
    const { active, direction } = event;
    this.sortDirection = direction;
    this.sortProperty = !direction  ? '' :  active;
    console.log('handleSortData orderBy=', this.sortProperty, 'as=', this.sortDirection);
    this.changeLimitAndPage(this.pageSize, 0);
  }
}
