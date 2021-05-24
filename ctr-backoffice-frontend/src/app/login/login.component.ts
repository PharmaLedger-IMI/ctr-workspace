import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../message.service';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  durationInSeconds = 5;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['']
  });

  constructor(
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = formBuilder.group({
      'username': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(InvalidLoginComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.appComponent.logout();
    this.appComponent.setNavMenuHighlight("", "login", " ");
    this.loginForm.reset();
  }

  login(form: NgForm) {
    let self = this;
    if (!this.loginForm.value.username) {
      self.log("Username cannot be empty!");
      return;
    }
    let auUsername = this.loginForm.value.username;
    let auPassword = this.loginForm.value.password;
    this.loginForm.value.password = '';
    this.messageService.add("Logging in \"" + auUsername + "\"");
    this.authService.login(auUsername, auPassword,
      function (err, res) {
        if (err) {
          self.log("Logged in \"" + auUsername + "\" failed " + JSON.stringify(err));
          if (err?.status == 401) { // HTTP status Unauthorized
            self.log("WRONG USER/PASS! TRY AGAIN!");
            self.openSnackBar();
            self.loginForm.reset();
          } else {
            self.log("Weird error!");
            self.openSnackBar();
            self.loginForm.reset();
          }
        } else {
          self.log("Logged in " + auUsername + " res=" + JSON.stringify(res));
          // TODO navigate to proper profile entry page
          self.router.navigate([self.authService.getUserTypeLoginPage()]);
          self.appComponent.sideNavOpened = true; // TODO Code to see if sidebar is really required
        }
      }
    );
  }

  get username() {
    return this.loginForm.get('username');
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
    this.messageService.add(`LoginComponent: ${message}`);
  }
}

@Component({
  selector: 'snack-bar-component-invalid-login',
  templateUrl: 'snack-bar-component-invalid-login.html',
  styles: [`
    .invalid-login {
      color: white;
    }
  `],
})
export class InvalidLoginComponent {}