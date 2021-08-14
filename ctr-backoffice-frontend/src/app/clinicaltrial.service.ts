import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { from, Observable, of, OperatorFunction } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClinicalTrialService {

  private clinicalTrialGhilUrl = environment.restBaseUrl+"/ctrial/clinicaltrial/"; // + ctrId + '/ghi'

  constructor(private http: HttpClient) { }

  getGhiQtArray(ctrId: string): Observable<any> {
    const url = this.clinicalTrialGhilUrl+ctrId+"/ghi";
    console.log("Url: "+url);
    return this.http.get<any>(url)
    .pipe(
      tap(_ => console.log(`fetched trial detail`)),
      catchError(this.handleError<any>(`clinicaltrial/id/ghi`))
    );
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
      return of(result as T);
    };
  }
}
