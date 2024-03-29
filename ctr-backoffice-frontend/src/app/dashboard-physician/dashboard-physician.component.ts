import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, NgForm, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, SortDirection } from "@angular/material/sort";
import { DashboardService } from '../dashboard.service';
import { ClinicalTrialDetailComponent } from '../clinicaltrial-detail/clinicaltrial-detail.component';
import { ClinicalTrialStatusList } from './clinicaltrialstatus.model';
import { LocationResults } from './locationfilterlist.model';
import { environment } from 'src/environments/environment';
import { ClinicalTrialList } from './clinicaltriallist.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicalConditionList } from './medicalconditionlist.model';
import { AppComponent } from '../app.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface TravelDistanceFilter {
  name: string;
  id: string;
}

@Component({
  selector: 'app-dashboard-physician',
  templateUrl: './dashboard-physician.component.html',
  styleUrls: ['./dashboard-physician.component.css']
})


export class DashboardPhysicianComponent implements OnInit {
  physicianDashboardFilterForm: FormGroup;

  // Form Controls
  conditionsFilter = new FormControl('', null);
  locationFilter = new FormControl('', null);
  travelDistanceFilter = new FormControl('', null);
  recruitingStageFilter = new FormControl('', null);
  selectFormControl = new FormControl('', null);

  // For getting image base url
  imageBaseUrl = environment.imageBaseUrl;

  // parameter used as a logic for hiding / showing different UI components before and after search
  noDisplayWithoutSearch = false;

  // validation parameters for making sure both the travel distance and location are selected before user taps the search button
  showTravelDistanceErrorMessage = false;
  travelDistanceMatcher = new InputErrorStateMatcher(this.showTravelDistanceErrorMessage);
  showLocationErrorMessage = false;
  locationMatcher = new InputErrorStateMatcher(this.showLocationErrorMessage);

  //pagination parameters
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  offset = 0;

  // filters array list
  conditionFilters: MedicalConditionList[] = [];
  locationFilters: LocationResults[] = [];
  selectedLocationFilters: LocationResults[] = [];
  travelDistanceFilters: TravelDistanceFilter[] = [
    { name: 'Any', id: '10000' },
    { name: '5 km', id: '3.11' },
    { name: '10 km', id: '6.22' },
    { name: '15 km', id: '9.32' },
    { name: '25 km', id: '15.54' },
    { name: '50 km', id: '31.1' },
  ];
  recruitingStageFilters: ClinicalTrialStatusList[] = [];
  clinicalTrialResults?: ClinicalTrialList;

  // parameter containing location value from search
  locationValue: string = '';

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'site_name', 'sponsor', 'learnMore'];
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  sortDirection: SortDirection = 'asc';
  sortProperty = 'name';
  get searchButtonPressed(): boolean {
    return this.DashboardService.getUserSearchButtonPressedValue() == "true";
  }

  constructor(private fb: FormBuilder,
    private DashboardService: DashboardService,
    private appComponent: AppComponent,
    public router: Router) {
    this.physicianDashboardFilterForm = fb.group({
      'conditionsFilter': [null, Validators.required],
      'locationFilter': [null, Validators.required],
      'recruitingStageFilter': [null, Validators.required]
    });

    this.addRefreshPageEvent();

  }

  ngOnInit(): void {
    this.appComponent.sideNavOpened = false;

    this.getLocations();
    this.getAllRecruitingStageList();
    this.getAllMedicalConditionList();

    this.startAutoSearch();

  }

  // Adding event subscription for page reload to clear all filters
  addRefreshPageEvent() {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          this.DashboardService.saveFilterDataToLocalStorage("", "", "", "", "false");
        }
      })
  }

  // If user presses back button, restoring the filters and search
  startAutoSearch() {
    if (this.DashboardService.getSelectedTravelDistanceIdFilter().length > 0) {
      var filterTravelDistanceArray = this.travelDistanceFilters.filter(travelDistance => travelDistance.id == this.DashboardService.getSelectedTravelDistanceIdFilter());
      this.travelDistanceFilter.setValue(filterTravelDistanceArray[0]);
    }

    if (this.searchButtonPressed) {
      if (this.DashboardService.getSelectedLocationIdFilter().length == 0) {
        this.getClincalTrialData(this.DashboardService.getSelectedRecruitingStageIdFilter(), this.DashboardService.getSelectedConditionIdFilter());
      }
    }

  }

  // Receive user input and send to search method
  onKey(event: any) {
    this.selectedLocationFilters = this.search(event.target.value);
  }

  // Filter the states list and send back to populate the selectedStates**
  search(value: string) {
    let filter = value.toLowerCase();
    return this.locationFilters.filter(option => option.description.toLowerCase().match(filter));
  }

  // Validation if location is added without travel distance
  locationValueChanged(event: any) {
    if (this.locationFilter.value.id != undefined) {
      this.showLocationErrorMessage = false;
      this.locationMatcher = new InputErrorStateMatcher(this.showLocationErrorMessage);
    }
  }

  // Validation if travel distance is added without location
  travelDistanceValueChanged(event: any) {
    if (this.travelDistanceFilter.value.id != undefined) {
      this.showTravelDistanceErrorMessage = false;
      this.travelDistanceMatcher = new InputErrorStateMatcher(this.showTravelDistanceErrorMessage);
    }
  }

  // Search trials button pressed
  searchTrials() {
    if (this.locationFilter.value.id?.length > 0 && this.travelDistanceFilter.value.id == undefined) {
      this.showTravelDistanceErrorMessage = true;
      this.travelDistanceMatcher = new InputErrorStateMatcher(this.showTravelDistanceErrorMessage);
      return;
    }
    if (this.travelDistanceFilter.value.id?.length > 0 && this.locationFilter.value.id == undefined) {
      this.showLocationErrorMessage = true;
      this.locationMatcher = new InputErrorStateMatcher(this.showLocationErrorMessage);
      return;
    }
    this.DashboardService.saveFilterDataToLocalStorage(this.conditionsFilter.value.code, this.locationFilter.value.id, this.travelDistanceFilter.value.id, this.recruitingStageFilter.value.code, "true");
    this.getClincalTrialData(this.recruitingStageFilter.value.code, this.conditionsFilter.value.code);
  }

  // Learn More Button Pressed - to re-direct to the trial detail screen
  learnMorePressed(trialId: string) {
    localStorage.setItem(ClinicalTrialDetailComponent.SELECTED_ID, trialId);
    this.router.navigate(['/clinicaltrial']);
  }

  handleSortData(event: Sort): void {
    const { active, direction } = event;
    this.sortDirection = direction;
    this.sortProperty = !direction  ? '' :  active;
    console.log('handleSortData orderBy=', this.sortProperty, 'as=', this.sortDirection);
    if (this.searchButtonPressed) {
      this.getClincalTrialData(this.recruitingStageFilter.value.code, this.conditionsFilter.value.code);
    }
  }

  // Next button pagination pressed
  getNext(event: PageEvent) {
    this.offset = event.pageSize * event.pageIndex;
    // calling api function here with the offset
    this.getClincalTrialData(this.recruitingStageFilter.value.code, this.conditionsFilter.value.code);
  }

  // API for getting all locations - No pagination implementation
  getLocations(): void {
    this.DashboardService.getAllLocations()
      .subscribe(locations => {
        //Add empty value
        var locationResultsEmptyObject: LocationResults = {id: "", description: "-", longitude: 0, latitude: 0};
        this.locationFilters.push(locationResultsEmptyObject);
        this.locationFilters = this.locationFilters.concat(locations.results);
        this.selectedLocationFilters = this.locationFilters;
        if (this.DashboardService.getSelectedLocationIdFilter().length > 0) {
          var filterLocationArray = this.selectedLocationFilters.filter(location => location.id == this.DashboardService.getSelectedLocationIdFilter());
          this.locationFilter.setValue(filterLocationArray[0]);

          if ((this.DashboardService.getSelectedTravelDistanceIdFilter().length > 0) ||
            (this.DashboardService.getSelectedLocationIdFilter().length > 0) ||
            (this.DashboardService.getSelectedRecruitingStageIdFilter().length > 0) ||
            (this.DashboardService.getSelectedConditionIdFilter().length > 0)) {
            if (this.DashboardService.getSelectedLocationIdFilter().length > 0) {
              this.getClincalTrialData(this.DashboardService.getSelectedRecruitingStageIdFilter(), this.DashboardService.getSelectedConditionIdFilter());
            }
          }
        }
      }
      );
  }

  // API for getting all recurring stages
  getAllRecruitingStageList(): void {
    this.DashboardService.getAllClinicalTrialStatus()
      .subscribe(clinicalTrialStatus => {
        //Add empty value
        var clinicalTrialStatusEmptyObject: ClinicalTrialStatusList = {code: "", description: "-"};
        this.recruitingStageFilters.push(clinicalTrialStatusEmptyObject);
        this.recruitingStageFilters = this.recruitingStageFilters.concat(clinicalTrialStatus);
        if (this.DashboardService.getSelectedRecruitingStageIdFilter().length > 0) {
          var filterRecruitingStageArray = this.recruitingStageFilters.filter(recruitingStage => recruitingStage.code == this.DashboardService.getSelectedRecruitingStageIdFilter());
          this.recruitingStageFilter.setValue(filterRecruitingStageArray[0]);
        }
      }
      );
  }

  // API for getting all medical conditions
  getAllMedicalConditionList(): void {
    this.DashboardService.getAllMedicalConditions().subscribe(medicalConditionList => {
      //Add empty value
      var medicalConditionEmptyObject: MedicalConditionList = {code: "", name: "-"};
      this.conditionFilters.push(medicalConditionEmptyObject);
      this.conditionFilters = this.conditionFilters.concat(medicalConditionList);
      if (this.DashboardService.getSelectedConditionIdFilter().length > 0) {
        var filterConditionArray = this.conditionFilters.filter(conditon => conditon.code == this.DashboardService.getSelectedConditionIdFilter());
        this.conditionsFilter.setValue(filterConditionArray[0]);
      }
    }
    );
  }

  // API call for getting all clinical trials data
  getClincalTrialData(recrutingStageFilterValue: string, conditionFilterValue: string) {
    this.DashboardService.getClinicalTrials(
      this.pageSize, this.offset / this.pageSize, this.locationFilter.value.longitude, this.locationFilter.value.latitude,
      this.travelDistanceFilter.value.id, recrutingStageFilterValue, conditionFilterValue, this.sortProperty, this.sortDirection
    ).subscribe(clinicalTrialList => {
        this.noDisplayWithoutSearch = true;
        this.clinicalTrialResults = clinicalTrialList;
        this.dataSource.data = clinicalTrialList.results;
        this.length = clinicalTrialList.count;
      }
      );
  }

}

class InputErrorStateMatcher implements ErrorStateMatcher {
  constructor(private errorstate: boolean) { }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.errorstate;
  }
}
