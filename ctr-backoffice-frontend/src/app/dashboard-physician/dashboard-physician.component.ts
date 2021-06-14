import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PhysiciandashboardService } from '../physiciandashboard.service';
import { ClinicalTrialStatusList } from './clinicaltrialstatus.model';
import { LocationResults } from './locationfilterlist.model';
import { environment } from 'src/environments/environment';
import { ClinicalTrialList } from './clinicaltriallist.model';

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

  conditionsFilter = new FormControl('', null);
  locationFilter = new FormControl('', null);
  travelDistanceFilter = new FormControl('', null);
  recurringStageFilter = new FormControl('', null);
  animalControl = new FormControl('', null);
  selectFormControl = new FormControl('', null);

  imageBaseUrl = environment.imageBaseUrl;

  noDisplayWithoutSearch = false;

  conditionFilters: ConditionsFilter[] = [
    { name: 'Condition 1', id: '1' },
    { name: 'Condition 2', id: '2' },
    { name: 'Condition 3', id: '3' },
    { name: 'Condition 4', id: '4' },
  ];
  locationFilters: LocationResults[] = [];
  travelDistanceFilters: ConditionsFilter[] = [
    { name: '5 mi', id: '5' },
    { name: '10 mi', id: '10' },
    { name: '15 mi', id: '15' },
    { name: '25 mi', id: '25' },
    { name: '50 mi', id: '50' },
  ];
  recurringStageFilters: ClinicalTrialStatusList[] = [];

  selectedLocationFilters: LocationResults[] = [];

  clinicalTrialResults?: ClinicalTrialList;

  locationValue: string = '';

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['trialName', 'siteLocation', 'sponsor', 'learnMore'];

  constructor(private fb: FormBuilder,
    private physicianDashboardService: PhysiciandashboardService) {
    this.physicianDashboardFilterForm = fb.group({
      'conditionsFilter': [null, Validators.required],
      'locationFilter': [null, Validators.required],
      'recurringStageFilter': [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getLocations();
    this.getClinicalTrialStatusList();

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
    this.physicianDashboardService.getClinicalTrials(0,this.locationFilter.value.longitude,this.locationFilter.value.latitude,this.travelDistanceFilter.value.id,this.recurringStageFilter.value.code)
    .subscribe(clinicalTrialList => {
      this.noDisplayWithoutSearch = true;
      this.clinicalTrialResults = clinicalTrialList;
      this.dataSource.data = clinicalTrialList.results;
    }
    );
  }

  searchTrials() {
    console.log(this.locationFilter.value.id);
    console.log(this.travelDistanceFilter.value.id);
    console.log(this.recurringStageFilter.value.code);
    this.getClincalTrialData();

  }

  learnMorePressed() {

  }

}