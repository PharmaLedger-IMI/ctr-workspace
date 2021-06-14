import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';
import { MatchRequest } from '../matchrequest';
import { MatchRequestService } from '../matchrequest.service';
import { PaginatedDto } from '../paginated.dto';

@Component({
  selector: 'app-matchrequest',
  templateUrl: './matchrequest.component.html',
  styleUrls: ['./matchrequest.component.css']
})
export class MatchRequestComponent implements OnInit {

  mrPaginated: PaginatedDto<any, MatchRequest> = { count: 0, query: {}, results: [] }; /* collection of all MatchRequest */

  //constructor() { }
  constructor(
    private appComponent: AppComponent, 
    private mrService: MatchRequestService
  ) {}

  ngOnInit(): void {
      this.appComponent.setNavMenuHighlight("admin", "matchrequest", "List of MatchRequest");
      this.getMatchRequests();
  }

  getMatchRequests(): void {
    this.mrService.getMatchRequests()
        .subscribe(mrPaginated => this.mrPaginated = mrPaginated);
  }
}
