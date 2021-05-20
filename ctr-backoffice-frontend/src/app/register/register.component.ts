import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ClinicalsiteService } from '../clinicalsite.service';
import { MessageService } from '../message.service';
import { SponsorService } from '../sponsor.service';
import { Observable, of } from 'rxjs';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Role {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  FirstName: string = '';
  LastName: string = '';
  Email: string = '';
  Password: string = '';

  SignUpRoles: Role[] = [
    { value: 'physician', viewValue: 'Physician' },
    { value: 'sponsor', viewValue: 'Sponsor' },
    { value: 'pharma', viewValue: 'Pharma' }
  ];

  durationInSeconds = 5;

  selectedRole = this.SignUpRoles[0].value;
  acceptTermsConditions = false;
  isSponsor = false;
  clinicalSites: any[] = [];
  sponsors: any[] = [];
  selectedSiteKey: string = '';
  selectedSponsorKey: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private clinicalSiteService: ClinicalsiteService,
    private sponsorService: SponsorService,
    private messageService: MessageService,
    private appComponent: AppComponent,
    private router: Router,
    private _snackBar: MatSnackBar) {
    if (this.authService.getUserType() == 'SponsorUser') {
      this.isSponsor = true;
      this.registerForm = fb.group({
        'FirstName': [null, Validators.required],
        'LastName': [null, Validators.required],
        'Email': [null, Validators.compose([Validators.required, Validators.email])],
        'Password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        'ClinicalSite': [null, null],
        'Sponsor': [null, Validators.required],
        'AcceptButtonCheckbox': [null, null]
      });
    } else if (this.authService.getUserType() == 'PhysicianUser') {
      this.isSponsor = false;
      this.registerForm = fb.group({
        'FirstName': [null, Validators.required],
        'LastName': [null, Validators.required],
        'Email': [null, Validators.compose([Validators.required, Validators.email])],
        'Password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        'ClinicalSite': [null, null],
        'Sponsor': [null, null],
        'AcceptButtonCheckbox': [null, null]
      });
    } else {
      this.isSponsor = false;
      this.registerForm = fb.group({
        'FirstName': [null, Validators.required],
        'LastName': [null, Validators.required],
        'Email': [null, Validators.compose([Validators.required, Validators.email])],
        'Password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        'ClinicalSite': [null, Validators.required],
        'Sponsor': [null, null],
        'AcceptButtonCheckbox': [null, null]
      });
    }
  }

  ngOnInit(): void {
    this.getClinicalSites();
    this.getSponsors();
  }

  getClinicalSites(): void {
    this.clinicalSiteService.getClinicalSites()
      .subscribe(clinicalSites => {
        this.clinicalSites = clinicalSites;
      }
      );
  }

  getSponsors(): void {
    this.sponsorService.getSponsors()
      .subscribe(sponsors => {
        this.sponsors = sponsors;
      }
      );
  }

  onTermsChangePressed(event: any) {
    if (event.checked == true) {
      this.acceptTermsConditions = true;
    } else {
      this.acceptTermsConditions = false;
    }
  }

  changeSiteValue(val: any) {
    this.selectedSiteKey = val;
    console.log("Site id selected: "+this.selectedSiteKey);
  }

  changeSponsorValue(val: any) {
    this.selectedSponsorKey = val;
    console.log("Sponsor id selected: "+this.selectedSponsorKey);
  }

  private log(message: string) {
    this.messageService.add(`LoginComponent: ${message}`);
  }

  onFormSubmit(form: NgForm) {
    let self = this;
    console.log(form);
    console.log("Site id selected: "+this.selectedSiteKey);
    console.log("Sponsor id selected: "+this.selectedSponsorKey);
    this.authService.signup(this.registerForm.value.Email,this.registerForm.value.Password,this.registerForm.value.FirstName, this.registerForm.value.LastName,this.selectedSponsorKey,this.selectedSiteKey,this.authService.getUserType(),
      function (err, res) {
        if (err) {
          self.log("Logged in \"" + self.Email + "\" failed " + JSON.stringify(err));
          if (err?.status == 401) { // HTTP status Unauthorized
            self.log("WRONG USER/PASS! TRY AGAIN!");
            self.openSnackBar();
          } else {
            self.log("Weird error!");
            self.openSnackBar();
          }
        } else {
          self.log("Logged in " + self.Email + " res=" + JSON.stringify(res));
          self.router.navigate(['/dashboard']); // TODO navigate to proper profile entry page
          self.appComponent.sideNavOpened = true; // TODO Code to see if sidebar is really required
        }
      }
    );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(InvalidRegisterComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}

@Component({
  selector: 'snack-bar-component-invalid-register',
  templateUrl: 'snack-bar-component-invalid-register.html',
  styles: [`
    .invalid-register {
      color: white;
    }
  `],
})
export class InvalidRegisterComponent {}