import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, OperatorFunction } from 'rxjs';
import { QuestionType } from './questiontype';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClinicalTrialService {

  private clinicalTrialGhilUrl = environment.restBaseUrl+"/ctrial/clinicaltrial/"; // + ctrId + '/ghi'

  constructor(private http: HttpClient) { }

  getGhiQtArray(ctrId: string): Observable<QuestionType[]> {
    const url = this.clinicalTrialGhilUrl+ctrId+"/ghi";
    console.log("Url: "+url);
    return this.http.get<QuestionType[]>(url)
    .pipe(
      tap(_ => console.log(`fetched QuestionType[]`)),
      catchError(this.handleError<QuestionType[]>(`clinicaltrial/id/ghi`))
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
