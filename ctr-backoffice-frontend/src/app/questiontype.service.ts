import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, OperatorFunction } from 'rxjs';
import { QuestionType } from './questiontype';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private borestBaseQtUrl = environment.restBaseUrl + "/ctrial/questiontype"; // + qtId 

  constructor(private http: HttpClient) { }

  get(qtId: string) : Observable<QuestionType> {
    const url = this.borestBaseQtUrl + "/" + qtId;
    console.log("Url: " + url);
    return this.http.get<any>(url)
      .pipe(
        tap(_ => console.log(`fetched QuestionType`)),
        catchError(this.handleError<any>(`GET questiontype/${qtId}`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Decide to throw or let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): OperatorFunction<T, T> {
    return (error: any): Observable<T> => {
      console.error("handleError", error);
      if (error) {
          // decide to throw
          if (error.error.message && error.error.statusCode >= 400 && error.error.statusCode < 600)
            throw error.error.message; // user error
          else
            throw error;
      }
      return of(result as T);
    };
  }

  post(qt: QuestionType): Observable<QuestionType> {
    const url = this.borestBaseQtUrl;
    console.log("Url: " + url);
    return this.http.post<any>(url, qt, httpOptions)
      .pipe(
        tap(_ => console.log(`posted QuestionType`)),
        catchError(this.handleError<any>(`POST questiontype`))
      );
  }

}
