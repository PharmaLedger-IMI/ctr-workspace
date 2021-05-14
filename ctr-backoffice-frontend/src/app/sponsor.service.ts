import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Observable, of, OperatorFunction} from 'rxjs';
import { ClinicalSiteList } from './register/clinicalsitelist.model';
import { MessageService } from './message.service';
import { SponsorList } from './register/sponsorlist.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private url = environment.restBaseUrl+"/ctrial/sponsor";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getSponsors(): Observable<SponsorList[]> {
    return this.http.get<SponsorList[]>(this.url)
    .pipe(
      tap(_ => this.log(`fetched sponsors`)),
      catchError(this.handleError<SponsorList[]>(`getSponsorList`))
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
