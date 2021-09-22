import { Component, OnInit } from '@angular/core';
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
  
  constructor(
    private appService: ApplicationService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appService.getAll(new ApplicationQuery()).subscribe((results) => {
      console.log("getAll", results);
      this.paginatedApps = results;
    });
  }

}
