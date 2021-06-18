import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, NgForm, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PhysiciandashboardService } from '../physiciandashboard.service';
import { ClinicalTrialStatusList } from './clinicaltrialstatus.model';
import { LocationResults } from './locationfilterlist.model';
import { environment } from 'src/environments/environment';
import { ClinicalTrialList } from './clinicaltriallist.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicalConditionList } from './medicalconditionlist.model';
import { AppComponent } from '../app.component';

interface ConditionsFilter {
  name: string;
  id: string;
}

export interface DialogData {
  alertType: 'location' | 'traveldistance';
}

@Component({
  selector: 'app-dashboard-physician',
  templateUrl: './dashboard-physician.component.html',
  styleUrls: ['./dashboard-physician.component.css']
})


export class DashboardPhysicianComponent implements OnInit {
  physicianDashboardFilterForm: FormGroup;

  conditionsFilter = new FormControl('', null);
  locationFilter = new FormControl('', null);
  travelDistanceFilter = new FormControl('', null);
  recurringStageFilter = new FormControl('', null);
  selectFormControl = new FormControl('', null);

  imageBaseUrl = environment.imageBaseUrl;

  noDisplayWithoutSearch = false;

  showTravelDistanceErrorMessage = false;
  travelDistanceMatcher = new InputErrorStateMatcher(this.showTravelDistanceErrorMessage);
  showLocationErrorMessage = false;
  locationMatcher = new InputErrorStateMatcher(this.showLocationErrorMessage);

  //Pagination
  length = 0;
  pageSize = 2;
  pageSizeOptions: number[] = [10];
  offset = 0;

  conditionFilters: MedicalConditionList[] = [];
  locationFilters: LocationResults[] = [];
  travelDistanceFilters: ConditionsFilter[] = [
    { name: '5 km', id: '3.11' },
    { name: '10 km', id: '6.22' },
    { name: '15 km', id: '9.32' },
    { name: '25 km', id: '15.54' },
    { name: '50 km', id: '31.1' },
  ];
  recurringStageFilters: ClinicalTrialStatusList[] = [];

  selectedLocationFilters: LocationResults[] = [];

  clinicalTrialResults?: ClinicalTrialList;

  locationValue: string = '';

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['trialName', 'siteLocation', 'sponsor', 'learnMore'];

  constructor(private fb: FormBuilder,
    private physicianDashboardService: PhysiciandashboardService,
    public dialog: MatDialog,
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
    this.getClinicalTrialStatusList();
    this.getAllMedicalConditionList();

    this.selectedLocationFilters = this.locationFilters;
  }

  getLocations(): void {
    this.physicianDashboardService.getAllLocations()
      .subscribe(locations => {
        this.locationFilters = locations.results;
        this.selectedLocationFilters = this.locationFilters;
      }
      );
  }

  getClinicalTrialStatusList(): void {
    this.physicianDashboardService.getAllClinicalTrialStatus()
      .subscribe(clinicalTrialStatus => {
        this.recurringStageFilters = clinicalTrialStatus;
      }
      );
  }

  getAllMedicalConditionList(): void {
    this.physicianDashboardService.getAllMedicalConditions().subscribe(medicalConditionList => {
      this.conditionFilters = medicalConditionList;
    }
    );
  }

  // Receive user input and send to search method**
  onKey(event: any) {
    this.selectedLocationFilters = this.search(event.target.value);
  }

  // Filter the states list and send back to populate the selectedStates**
  search(value: string) {
    let filter = value.toLowerCase();
    return this.locationFilters.filter(option => option.description.toLowerCase().match(filter));
  }

  getClincalTrialData() {
    // const TRIAL_TEMP = [
    //   { trialName: "Safety and Efficiancy of Pf-06650833 In Subjects With Rheumatoid Arthritis, With An Inadequate Response To Methotrexate", siteLocation: 'University of Madrid Hospital 28015 Mandrid, Spain', sponsor: "Pfizer", trialId: 'NCT02996500', distance: '1 kilometer from you' },
    //   { trialName: "Phase IIb Study of Evobrutinib in Subjects With Rheumatoid Arthritis", siteLocation: 'Madrid General Hospital 20192 Madrid, Spain', sponsor: "Pfizer", trialId: 'NCT03233230', distance: '2 kilometers from you' },
    //   { trialName: "Study to Evaluate the Long-Term Safety and Efficacy of GDC-0853 in Participants With Moderate to Severe Rheumatoid Arthritis", siteLocation: 'Clinical of Madrid 30131 Madrid, Spain', sponsor: "Pfizer", trialId: 'NCT02833350', distance: '5 kilometers from you' },
    // ];
    // this.dataSource.data = TRIAL_TEMP;
    this.physicianDashboardService.getClinicalTrials(this.pageSize, this.offset / this.pageSize, this.locationFilter.value.longitude, this.locationFilter.value.latitude, this.travelDistanceFilter.value.id, this.recurringStageFilter.value.code)
      .subscribe(clinicalTrialList => {
        this.noDisplayWithoutSearch = true;
        this.clinicalTrialResults = clinicalTrialList;
        this.dataSource.data = clinicalTrialList.results;
        this.length = clinicalTrialList.count;
      }
      );
  }

  locationValueChanged(event: any) {
    if (this.locationFilter.value.id != undefined) {
      this.showLocationErrorMessage = false;
      this.locationMatcher = new InputErrorStateMatcher(this.showLocationErrorMessage);
    }
  }

  travelDistanceValueChanged(event: any) {
    if (this.travelDistanceFilter.value.id != undefined) {
      this.showTravelDistanceErrorMessage = false;
      this.travelDistanceMatcher = new InputErrorStateMatcher(this.showTravelDistanceErrorMessage);
    }
  }

  searchTrials() {
    console.log(this.locationFilter.value.id);
    console.log(this.travelDistanceFilter.value.id);
    console.log(this.recurringStageFilter.value.code);
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

  learnMorePressed() {

  }

  getNext(event: PageEvent) {
    console.log("Offset: " + this.offset);
    this.offset = event.pageSize * event.pageIndex;
    console.log("Offset: " + this.offset);
    // call your api function here with the offset
    this.getClincalTrialData();
  }

}

class InputErrorStateMatcher implements ErrorStateMatcher {
  constructor(private errorstate: boolean) { }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.errorstate;
  }
}
