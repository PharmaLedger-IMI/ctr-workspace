import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { from, Observable, of, OperatorFunction } from 'rxjs';
import { LocationFilterList } from './dashboard-physician/locationfilterlist.model'
import { MessageService } from './message.service';
import { ClinicalTrialStatusList } from './dashboard-physician/clinicaltrialstatus.model';
import { ClinicalTrialList } from './dashboard-physician/clinicaltriallist.model';
import { MedicalConditionList } from './dashboard-physician/medicalconditionlist.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PhysiciandashboardService {

  private locationUrl = environment.restBaseUrl+"/ctrial/location?limit=10000&sortDirection=ASC";
  private clinicalTrialStatusUrl = environment.restBaseUrl+"/ctrial/clinicaltrialstatus";
  private medicalConditionsUrl = environment.restBaseUrl+"/ctrial/medicalcondition";
  private clinicalTrialListUrl = environment.restBaseUrl+"/ctrial/clinicaltrial?";

  private clinicalTrialListQueryParam: string = "";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAllLocations(): Observable<LocationFilterList> {
    return this.http.get<LocationFilterList>(this.locationUrl)
    .pipe(
      tap(_ => this.log(`fetched locations`)),
      catchError(this.handleError<LocationFilterList>(`locationFilterList`))
    );
  }

  getAllClinicalTrialStatus(): Observable<ClinicalTrialStatusList[]> {
    return this.http.get<ClinicalTrialStatusList[]>(this.clinicalTrialStatusUrl)
    .pipe(
      tap(_ => this.log(`fetched clinical trial status list`)),
      catchError(this.handleError<ClinicalTrialStatusList[]>(`clinicalTrialStatusList`))
    );
  }

  getAllMedicalConditions(): Observable<MedicalConditionList[]> {
    return this.http.get<MedicalConditionList[]>(this.medicalConditionsUrl)
    .pipe(
      tap(_ => this.log(`fetched medical condition list`)),
      catchError(this.handleError<MedicalConditionList[]>(`medicalConditionList`))
    );
  }

  getClinicalTrials(limit: number, page: number, longitude: number, latitude: number, distance: string, recurringStageId: string): Observable<ClinicalTrialList> {
    this.clinicalTrialListQueryParam = "page="+page+"&sortDirection=ASC&limit="+limit;
    if ((typeof longitude === 'number') && longitude != 0) {
      this.clinicalTrialListQueryParam = this.clinicalTrialListQueryParam + "&longitude="+longitude;
    }
    if ((typeof latitude === 'number') && latitude != 0) {
      this.clinicalTrialListQueryParam = this.clinicalTrialListQueryParam + "&latitude="+latitude;
    }
    if (distance?.length > 0) {
      this.clinicalTrialListQueryParam = this.clinicalTrialListQueryParam + "&sortProperty=TRAVEL_DISTANCE&travelDistance="+distance;
    }
    if (recurringStageId?.length > 0) {
      this.clinicalTrialListQueryParam = this.clinicalTrialListQueryParam + "&status="+recurringStageId;
    }
    console.log("Complete get url: "+this.clinicalTrialListUrl+this.clinicalTrialListQueryParam)
    return this.http.get<ClinicalTrialList>(this.clinicalTrialListUrl+this.clinicalTrialListQueryParam)
    .pipe(
      tap(_ => this.log(`fetched clinical trial list`)),
      catchError(this.handleError<ClinicalTrialList>(`clinicalTrialList`))
    );
  }

  private log(message: string): void {
    // this.messageService.add(`LocaleService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T): OperatorFunction<T, T>{
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
