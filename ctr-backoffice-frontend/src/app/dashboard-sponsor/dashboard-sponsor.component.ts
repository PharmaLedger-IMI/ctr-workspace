import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ClinicalTrialList } from '../dashboard-physician/clinicaltriallist.model';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-sponsor',
  templateUrl: './dashboard-sponsor.component.html',
  styleUrls: ['./dashboard-sponsor.component.css']
})
export class DashboardSponsorComponent implements OnInit {

  // For getting image base url
  imageBaseUrl = environment.imageBaseUrl;

  //pagination parameters
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  offset = 0;

  clinicalTrialResults?: ClinicalTrialList;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['trialName', 'siteLocation', 'status', 'viewMore'];

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
  viewMorePressed(trialId: string) {
  }
  
  // API call for getting all clinical trials data
  getClincalTrialData() {
    this.DashboardService.getSponsorClinicalTrials(this.pageSize, this.offset / this.pageSize, this.authService.getSponsorId() || '')
      .subscribe(clinicalTrialList => {
        this.clinicalTrialResults = clinicalTrialList;
        this.dataSource.data = clinicalTrialList.results;
        this.length = clinicalTrialList.count;
      }
      );
  }

}
