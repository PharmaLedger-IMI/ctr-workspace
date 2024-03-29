import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { ClinicalTrialDetailComponent } from '../clinicaltrial-detail/clinicaltrial-detail.component';
import { ClinicalTrialList } from '../dashboard-physician/clinicaltriallist.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-clinicalsite',
  templateUrl: './dashboard-clinicalsite.component.html',
  styleUrls: ['./dashboard-clinicalsite.component.css']
})
export class DashboardClinicalSiteComponent implements OnInit {


  // For getting image base url
  imageBaseUrl = environment.imageBaseUrl;

  //pagination parameters
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  offset = 0;

  clinicalTrialResults?: ClinicalTrialList;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['trialName', 'viewMore'];

  constructor(private appComponent: AppComponent,
    public router: Router,
    private DashboardService: DashboardService,
    private authService: AuthService) { }

  ngOnInit(): void {
    setTimeout(() => this.appComponent.sideNavOpened = false,100);

    this.getClincalTrialData();
  }

  // Next button pagination pressed
  getNext(event: PageEvent) {
    this.offset = event.pageSize * event.pageIndex;
    // calling api function here with the offset
    this.getClincalTrialData();
  }

  // Learn More Button Pressed - to re-direct to the trial detail screen
  viewMorePressed(ctrId: string) {
    localStorage.setItem(ClinicalTrialDetailComponent.SELECTED_ID, ctrId);
    this.router.navigate(['/clinicaltrial-clinicalsite']);
  }
  
  // API call for getting all clinical trials data
  getClincalTrialData() {
    this.DashboardService.getClinicalSiteTrials(this.pageSize, this.offset / this.pageSize, this.authService.getClinicalSiteId() || '')
      .subscribe(clinicalTrialList => {
        this.clinicalTrialResults = clinicalTrialList;
        this.dataSource.data = clinicalTrialList.results;
        this.length = clinicalTrialList.count;
      }
    );
  }

}
