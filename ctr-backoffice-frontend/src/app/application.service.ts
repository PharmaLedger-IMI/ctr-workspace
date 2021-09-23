import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, OperatorFunction } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Application } from './application';
import { ApplicationQuery } from './applicationQuery';
import { PaginatedDto } from './paginated.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private borestBaseAppUrl = environment.restBaseUrl + "/ctrial/application"; // + appId 

  constructor(private http: HttpClient) { }

  // from https://stackoverflow.com/questions/41993515/access-object-key-using-variable-in-typescript
  typedKeys<T>(o: T): (keyof T)[] {
    // type cast should be safe because that's what really Object.keys() does
    return Object.keys(o) as (keyof T)[];
  }

  getAll(appQuery: ApplicationQuery) : Observable<PaginatedDto<ApplicationQuery, Application>> {
    let url = this.borestBaseAppUrl;
    let firstParam = true;
    if (appQuery) { // encode appQuery parameters in the URL
      this.typedKeys(appQuery).forEach( (appQueryKey, index) => {
        const value = appQuery[appQueryKey];
        if (value) {
          if (firstParam) {
            url += '?';
            firstParam = false;
          } else {
            url += "&";
          }
          url += appQueryKey + "=" + encodeURIComponent(value);
        }
      });
    }
    console.log("Url: " + url);
    return this.http.get<any>(url)
      .pipe(
        tap(_ => console.log(`fetched Application`)),
        catchError(this.handleError<any>(`GET ${url}`))
      );
  }

  get(appId: string) : Observable<Application> {
    const url = this.borestBaseAppUrl + "/" + appId;
    console.log("Url: " + url);
    return this.http.get<any>(url)
      .pipe(
        tap(_ => console.log(`fetched Application`)),
        catchError(this.handleError<any>(`GET application/${appId}`))
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
