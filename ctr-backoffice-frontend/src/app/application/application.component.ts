import { AotCompiler } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
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
  
  @Input() displayedColumns: string[] = ['name', 'email', 'clinicalSite', 'clinicalTrial', 'sponsor', 'createdOn'];

  // For getting image base url
  imageBaseUrl = environment.imageBaseUrl;

  @Input() pageSize: number = 5;
  
  paginatedApps: PaginatedDto<ApplicationQuery, Application> = { count: 0, query: new ApplicationQuery(), results: []};

  @Input() title: string = "My applications";

  constructor(
    private appService: ApplicationService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.changeLimitAndPage(this.pageSize,0);
  }

  changeCurrentPage(event: PageEvent) {
    this.changeLimitAndPage(event.pageSize, event.pageIndex);
  }

  changeLimitAndPage(pageSize: number, pageIndex: number) {
    const appQuery = new ApplicationQuery();
    appQuery.clinicalSite = this.authService.getClinicalSiteId(); // gives undefined if the current user is not from a ClinicalSite
    //if (appQuery.clinicalSite)
    //  this.removeDisplayColumn("clinicalSite");
    //appQuery.sponsor = this.authService.getSponsorId(); // TODO // gives undefined if the current user is not from a Sponsor
    //if (appQuery.sponsor)
    //  this.removeDisplayColumn("sponsor");
    appQuery.limit = pageSize;
    appQuery.page = pageIndex;
    this.appService.getAll(appQuery).subscribe((results) => {
      console.log("getAll", results);
      this.paginatedApps = results;
    });
  }

  /*
  removeDisplayColumn(colName : string) {
    console.log("Hidding column", colName);
    const index = this.displayedColumns.indexOf(colName);
    if (index > -1) {
      this.displayedColumns.splice(index, 1);
    }
    console.log("Hidding column", colName, this.displayedColumns);
  }
  */
}
