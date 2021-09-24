import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ClinicalTrialList } from '../dashboard-physician/clinicaltriallist.model';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';

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
  displayedColumns: string[] = ['name', 'siteLocation', 'viewMore'];
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  sortDirection: SortDirection = 'asc';
  sortProperty = 'name';

  static readonly SELECTED_SITE_ID : string = "selected_site_id";

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
    localStorage.setItem(DashboardSponsorComponent.SELECTED_SITE_ID, trialId);
    this.router.navigate(['/clinicaltrial']);
  }

  handleSortData(event: Sort): void {
    const { active, direction } = event;
    this.sortDirection = direction;
    this.sortProperty = !direction  ? '' :  active;
    console.log('handleSortData orderBy=', this.sortProperty, 'as=', this.sortDirection);
    this.getClincalTrialData();
  }

  // API call for getting all clinical trials data
  getClincalTrialData() {
    this.DashboardService.getSponsorClinicalTrials(this.pageSize, this.offset / this.pageSize, this.authService.getSponsorId() || '', this.sortProperty, this.sortDirection)
      .subscribe(clinicalTrialList => {
        this.clinicalTrialResults = clinicalTrialList;
        this.dataSource.data = clinicalTrialList.results;
        this.length = clinicalTrialList.count;
      }
      );
  }

}
