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
export class GeneralHealthInformationQuestionTypeService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private borestBaseGhiQtUrl = environment.restBaseUrl + "/ctrial/generalhealthinformationquestiontype";

  constructor(private http: HttpClient) { }

  get() : Observable<QuestionType[]> {
    const url = this.borestBaseGhiQtUrl;
    console.log("Url: " + url);
    return this.http.get<any>(url)
      .pipe(
        tap(_ => console.log(`fetched generalhealthinformationquestiontype`)),
        catchError(this.handleError<any>(`GET generalhealthinformationquestiontype`))
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

}
