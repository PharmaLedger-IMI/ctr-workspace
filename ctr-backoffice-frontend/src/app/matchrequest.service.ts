import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';
import { MatchRequest } from './matchrequest';
import { PaginatedDto } from './paginated.dto';

@Injectable({
  providedIn: 'root'
})
export class MatchRequestService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private mrUrl = environment.restBaseUrl+"/ctrial/matchrequest";

  constructor(
      private http: HttpClient
  ) { }

  getMatchRequests(): Observable<PaginatedDto<any, MatchRequest>> {
      // TODO: send the message _after_ fetching the heroes
      console.log('MatchRequestService: fetching mrCollection from '+this.mrUrl);
      return this.http.get<PaginatedDto<any, MatchRequest>>(this.mrUrl).pipe(
          tap(_ => { console.log(`fetched MatchRequest`); }),
          catchError(this.handleError<PaginatedDto<any, MatchRequest>>('getMatchRequests', { count: 0, query: {}, results: [] }))
      );
  }

  getMatchRequest(keySSI: string): Observable<MatchRequest> {
      // TODO: send the message _after_ fetching the mr
      const mrUrlId = `${this.mrUrl}/${encodeURIComponent(keySSI)}`;

      console.log('MatchRequestService: fetching mr from '+mrUrlId);
      return this.http.get<MatchRequest>(mrUrlId).pipe(
          tap(_ => { console.log(`fetched MatchRequest`); }),
          catchError(this.handleError<MatchRequest>('getMatchRequest'))
      );
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
