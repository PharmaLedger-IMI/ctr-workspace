import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, NgForm, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PhysiciandashboardService } from '../physiciandashboard.service';
import { ClinicalTrialStatusList } from './clinicaltrialstatus.model';
import { LocationResults } from './locationfilterlist.model';
import { environment } from 'src/environments/environment';
import { ClinicalTrialList } from './clinicaltriallist.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicalConditionList } from './medicalconditionlist.model';
import { AppComponent } from '../app.component';

interface ConditionsFilter {
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
  recurringStageFilter = new FormControl('', null);
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
  travelDistanceFilters: ConditionsFilter[] = [
    { name: '5 km', id: '3.11' },
    { name: '10 km', id: '6.22' },
    { name: '15 km', id: '9.32' },
    { name: '25 km', id: '15.54' },
    { name: '50 km', id: '31.1' },
  ];
  recurringStageFilters: ClinicalTrialStatusList[] = [];
  clinicalTrialResults?: ClinicalTrialList;

  // parameter containing location value from search
  locationValue: string = '';

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['trialName', 'siteLocation', 'sponsor', 'learnMore'];

  constructor(private fb: FormBuilder,
    private physicianDashboardService: PhysiciandashboardService,
    private appComponent: AppComponent) {
    this.physicianDashboardFilterForm = fb.group({
      'conditionsFilter': [null, Validators.required],
      'locationFilter': [null, Validators.required],
      'recurringStageFilter': [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.appComponent.sideNavOpened = false;

    this.getLocations();
    this.getAllRecruitingStageList();
    this.getAllMedicalConditionList();

    this.selectedLocationFilters = this.locationFilters;
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
    this.getClincalTrialData();
  }

  // Learn More Button Pressed - to re-direct to the trial detail screen
  learnMorePressed() {

  }

  // Next button pagination pressed
  getNext(event: PageEvent) {
    this.offset = event.pageSize * event.pageIndex;
    // calling api function here with the offset
    this.getClincalTrialData();
  }

  // API for getting all locations - No pagination implementation
  getLocations(): void {
    this.physicianDashboardService.getAllLocations()
      .subscribe(locations => {
        this.locationFilters = locations.results;
        this.selectedLocationFilters = this.locationFilters;
      }
      );
  }

  // API for getting all recurring stages
  getAllRecruitingStageList(): void {
    this.physicianDashboardService.getAllClinicalTrialStatus()
      .subscribe(clinicalTrialStatus => {
        this.recurringStageFilters = clinicalTrialStatus;
      }
      );
  }

  // API for getting all medical conditions
  getAllMedicalConditionList(): void {
    this.physicianDashboardService.getAllMedicalConditions().subscribe(medicalConditionList => {
      this.conditionFilters = medicalConditionList;
    }
    );
  }

  // API call for getting all clinical trials data
  getClincalTrialData() {
    this.physicianDashboardService.getClinicalTrials(this.pageSize, this.offset / this.pageSize, this.locationFilter.value.longitude, this.locationFilter.value.latitude, this.travelDistanceFilter.value.id, this.recurringStageFilter.value.code, this.conditionsFilter.value.code)
      .subscribe(clinicalTrialList => {
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
