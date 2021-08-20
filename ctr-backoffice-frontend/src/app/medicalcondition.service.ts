import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, OperatorFunction } from 'rxjs';
import { MedicalCondition } from './medicalcondition';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MedicalConditionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private borestBaseMcUrl = environment.restBaseUrl + "/ctrial/medicalcondition";

  constructor(private http: HttpClient) { }

  getAll() : Observable<MedicalCondition[]> {
    const self = this;
    const url = this.borestBaseMcUrl;
    console.log("Url: " + url);
    return this.http.get<MedicalCondition[]>(url)
      .pipe(
        tap(_ => console.log(`fetched MedicalCondition[]`)),
        catchError(this.handleError<MedicalCondition[]>(`GET medicalcondition`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): OperatorFunction<T, T> {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
