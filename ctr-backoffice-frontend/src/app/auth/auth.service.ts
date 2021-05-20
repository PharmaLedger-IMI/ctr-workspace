import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../user';

@Injectable()
export class AuthService {

  static readonly CTR_USER : string = "ctr_user";
  static readonly CTR_TYPE : string = "ctr_type";

  private authLoginUrl = environment.restBaseUrl+"/auth/login";
  private authSignupUrl = environment.restBaseUrl+"/auth/signup";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Performs the login. Inspired on https://blog.angular-university.io/angular-jwt-authentication/
   * @param username 
   * @param password in clear text
   * @returns Observable<{ token: string }>
   */
  login(username: string, password: string|undefined, callback: (err:any, data:any) => void) : void {
    // backend /auth/login returns token
    this.http.post<{ token: string; }>(this.authLoginUrl, { username, password })
    .subscribe(
      (res: any) => {
        this.log(`posted ${username},${password}, ${res}`);
        if (!res.token || !res.username) {
          callback("Missing username/token field in "+JSON.stringify(res), null);
          return;
        }
        this.setSession(res);
        callback(null, res);
      },
      (err: any) => {
        callback(err, null);
      }
    );
  }

signup(username: string, password: string, firstName: string, lastName: string, sponsorId: string, clinicalSiteId: string, type: string, callback: (err:any, data:any) => void) : void {
// backend /auth/signup returns token
this.http.post<{ token: string; }>(this.authSignupUrl, { username, password, firstName, lastName, sponsorId, clinicalSiteId, type })
.subscribe(
  (res: any) => {
    this.log(`posted ${username},${password},${firstName},${firstName},${sponsorId},${clinicalSiteId},${type}, ${res}`);
    if (!res.token || !res.username) {
      callback("Missing username/token field in "+JSON.stringify(res), null);
      return;
    }
    this.setSession(res);
    callback(null, res);
  },
  (err: any) => {
    callback(err, null);
  }
);
  }

  private setSession(authResult: any): void {
    let user = new User();
    user.id = authResult.id;
    user.username = authResult.username;
    user.token = authResult.token;
    user.clinicalSite = authResult.clinicalSite;
    user.sponsor = authResult.sponsor;
    user.physician = authResult.physician;
    sessionStorage.setItem(AuthService.CTR_USER, JSON.stringify(user));
  }

  public logout() {
    sessionStorage.clear();
  }

  public hasAdminProfile() : boolean {
    return this.isLoggedIn(); // && ... // TODO everyone is admin for now
  }

  public hasPhysicianProfile() : boolean {
    return this.isLoggedIn() && this.getUser()?.physician;
  }

  public hasSiteProfile() : boolean {
    return this.isLoggedIn() && this.getUser()?.clinicalSite;
  }

  public hasSponsorProfile() : boolean {
    return this.isLoggedIn() && this.getUser()?.sponsor;
  }

  public isLoggedIn() : boolean {
    return !!sessionStorage.getItem(AuthService.CTR_USER);
  }

  public isLoggedOut() : boolean {
    return !this.isLoggedIn();
  }

  public getToken() : string | undefined {
    return this.getUser()?.token;
  }

  public getUser() : User | undefined {
    if (this.isLoggedIn()) {
      return JSON.parse(sessionStorage.getItem(AuthService.CTR_USER)!);
    } else {
      return undefined;
    }
  }

  public getUsername() : string | undefined {
    return this.getUser()?.username;
  }

  public getUserType() : string {
    return localStorage.getItem(AuthService.CTR_TYPE) || "";
  }

  public setUserType(userType: string) {
    console.log("User type set: "+userType);
    localStorage.setItem(AuthService.CTR_TYPE, userType);
    console.log("Return: "+this.getUserType());
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
    this.messageService.add(`AuthService: ${message}`);
  }
}
