import { AotCompiler } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
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

  paginatedApps: PaginatedDto<ApplicationQuery, Application> = { count: 0, query: new ApplicationQuery(), results: []};
  
  displayedColumns: string[] = ['name', 'email', 'createdOn'];

  constructor(
    private appService: ApplicationService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const appQuery = new ApplicationQuery();
    appQuery.clinicalSite = this.authService.getClinicalSiteId();
    //appQuery.sponsor = this.authService.getSponsorId(); // TODO
    this.appService.getAll(new ApplicationQuery()).subscribe((results) => {
      console.log("getAll", results);
      this.paginatedApps = results;
    });
  }

  changePage(event: PageEvent) {
    // calling api function here with the offset
    const appQuery = new ApplicationQuery();
    appQuery.limit = event.pageSize;
    appQuery.page = event.pageIndex;
    this.appService.getAll(appQuery).subscribe((results) => {
      console.log("getAll", results);
      this.paginatedApps = results;
    });
  }
}
