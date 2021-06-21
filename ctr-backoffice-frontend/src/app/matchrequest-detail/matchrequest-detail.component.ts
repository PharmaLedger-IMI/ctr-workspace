import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from '../app.component';
import { MatchRequest } from '../matchrequest';
import { MatchRequestService } from '../matchrequest.service';

@Component({
  selector: 'app-matchrequest-detail',
  templateUrl: './matchrequest-detail.component.html',
  styleUrls: ['./matchrequest-detail.component.css']
})
export class MatchRequestDetailComponent implements OnInit {

  @Input() mr?: MatchRequest;

  constructor(
      private appComponent: AppComponent, 
      private route: ActivatedRoute,
      private mrService: MatchRequestService,
      private location: Location
  ) {}

  ngOnInit(): void {
      this.appComponent.setNavMenuHighlight("admin", "matchrequest", "Match Request Detail");
      this.getMatchRequest();
  }

  getMatchRequest(): void {
      const keySSI = this.route.snapshot.paramMap.get('keyssi');
      if (!keySSI) {
          console.log("request keyssi is null");
          this.location.back();
          return;
      }
      this.mrService.getMatchRequest(keySSI)
          .subscribe(mr => this.mr = mr);
  }

  goBack(): void {
      this.location.back();
  }
}
