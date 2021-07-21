import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { from, Observable, of, OperatorFunction } from 'rxjs';
import { MessageService } from './message.service';
import { ClinicalTrialListResults } from './dashboard-physician/clinicaltriallist.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TrialdetailService {

  private trialDetailsUrl = environment.restBaseUrl+"/ctrial/clinicaltrial/";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTrialDetails(siteId: string): Observable<ClinicalTrialListResults> {
    console.log("Url: "+this.trialDetailsUrl+siteId);
    return this.http.get<ClinicalTrialListResults>(this.trialDetailsUrl+siteId)
    .pipe(
      tap(_ => this.log(`fetched trial detail`)),
      catchError(this.handleError<ClinicalTrialListResults>(`trialdetails`))
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
