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
export class ClinicalTrialService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private borestBaseCtrUrl = environment.restBaseUrl + "/ctrial/clinicaltrial"; // + ctrId + '/stage'

  constructor(private http: HttpClient) { }

  get(ctrId: string) : Observable<any> {
    const url = this.borestBaseCtrUrl + "/" + ctrId;
    console.log("Url: " + url);
    return this.http.get<any>(url)
      .pipe(
        tap(_ => console.log(`fetched ClinicalTrial`)),
        catchError(this.handleError<any>(`GET clinicaltrial/${ctrId}`))
      );
  }

  getFormGroup(ctrId: string, stage: string, callback: (error : any, ghiQtArray?: QuestionType[], ghiQtFormGroup?: FormGroup) => void) {
    const self = this;
    this.getQtArray(ctrId, stage).subscribe(qtArray => {
      console.log(qtArray);
      let qtArrayAux = qtArray; // subset [ghiQtArray[0],ghiQtArray[3]];
      const fg = self.toFormGroup(qtArrayAux);
      return callback(undefined, qtArrayAux, fg);
    }, (error) => {
      return callback(error, undefined, undefined);
    });
  }

  protected getQtArray(ctrId: string, stage: string): Observable<QuestionType[]> {
    const url = this.borestBaseCtrUrl + "/" + ctrId + "/" + stage;
    console.log("Url: " + url);
    return this.http.get<QuestionType[]>(url)
      .pipe(
        tap(_ => console.log(`fetched QuestionType[]`)),
        catchError(this.handleError<QuestionType[]>(`GET clinicaltrial/id/${stage}`))
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
          if (error.error.message && error.error.statusCode >= 500 && error.error.statusCode < 600)
            throw error.error.message; // user error
          else
            throw error;
      }
      return of(result as T);
    };
  }

  /**
   * Initilialize in sessionStorage, info about a new ClinicalTrial being created, but not yet saved.
   * @param ctr 
   * @returns An object containing all the data required to call 
   */
  initCreationFlow(ctr: any) : any {
    const ctrForCreation = {
      clinicalTrial: ctr,
      ghiCriteria: undefined
    }
    sessionStorage.setItem("ctrForCreation", JSON.stringify(ctrForCreation));
    return ctrForCreation;
  }

  /**
   * Fetch (from sessionStorage) info about a new ClinicalTrial being created, but not yet saved.
   * @returns An object containing all the data required to call POST clinicaltrial/full. Undefined if initCreationFlow was not called before.
   */
  getCreationFlow() : any {
    const jsonStr = sessionStorage.getItem("ctrForCreation");
    if (jsonStr)
      return JSON.parse(jsonStr);
    return undefined;
  }

  /**
   * Update (from sessionStorage) info about a new ClinicalTrial being created, but not yet saved.
   * @param ctrForCreation An object created by the initCreationFlow method.
   * @returns An object containing all the data required to call POST clinicaltrial/full. Undefined if initCreationFlow was not called before.
   */
  updateCreationFlow(ctrForCreation : any) : any {
    sessionStorage.setItem("ctrForCreation", JSON.stringify(ctrForCreation));
    return ctrForCreation;
  }

  post(ctr: any): Observable<any> {
    const url = this.borestBaseCtrUrl;
    console.log("Url: " + url);
    return this.http.post<any>(url, ctr, httpOptions)
      .pipe(
        tap(_ => console.log(`posted ClinicalTrial`)),
        catchError(this.handleError<any>(`POST clinicaltrial`))
      );
  }

  postFull(ctr: any): Observable<any> {
    const url = this.borestBaseCtrUrl+"/full";
    console.log("Url: " + url);
    return this.http.post<any>(url, ctr, httpOptions)
      .pipe(
        tap(_ => console.log(`posted ClinicalTrial full`)),
        catchError(this.handleError<any>(`POST clinicaltrial/full`))
      );
  }

  put(ctr: any): Observable<any> {
    const url = this.borestBaseCtrUrl;
    console.log("Url: " + url);
    return this.http.put<any>(url, ctr, httpOptions)
      .pipe(
        tap(_ => console.log(`puted ClinicalTrial`)),
        catchError(this.handleError<any>(`PUT clinicaltrial`))
      );
  }

  submitQtArray(ctrId: string, stage: string, qtArray: QuestionType[], form: FormGroup): Observable<any> {
    const newQtArray = this.newQtArrayFromForm(qtArray, form);
    const url = this.borestBaseCtrUrl + "/" + ctrId + "/" + stage;
    console.log("Url: " + url);
    return this.http.put(url, newQtArray, this.httpOptions)
      .pipe(
        tap(_ => console.log(`posted QuestionType[]`)),
        catchError(this.handleError<any>(`PUT clinicaltrial/id/${stage}`))
      );
  }

  protected toFormGroup(qtArray: QuestionType[]): FormGroup {
    const formControls: any = {};

    qtArray.forEach(qt => {
      qt.fAddToCriteria = (qt.criteria) ? true : false;
      // qt.fFreeCriteria can be one of
      // "YN" - Yes/No criteria match control
      // "YNNS" - Yes/No/Not sure criteria match control
      // "-" - Free JS expression.
      // Keep matched with src/app/question-criteria/question-criteria.component.html
      if (qt.dataType.code == "YNNS"
        && (!qt.criteria || qt.criteria == "YNNS_YNS" || qt.criteria == "YNNS_NNS")
      ) {
        qt.fFreeCriteria = "YNNS";
      } else if (qt.dataType.code == "YN"
        && (!qt.criteria || qt.criteria == "YN_Y" || qt.criteria == "YN_N")
      ) {
        qt.fFreeCriteria = "YN";
      } else {
        qt.fFreeCriteria = "-";
      }
      if (qt.dataType.code == "CNE") {
        let sep = ' ; ';
        qt.fCneOptions = '';
        qt.answers!.forEach((qtAnswer) => {
          qt.fCneOptions += sep + qtAnswer.text;
          sep = ' / ';
        });
      }
      formControls[qt.localQuestionCode + "_k"] = new FormControl(qt.fAddToCriteria || false);
      formControls[qt.localQuestionCode + "_l"] = new FormControl(qt.criteriaLabel || '');
      formControls[qt.localQuestionCode + "_c"] = new FormControl(qt.criteria || '');
    });
    const qtCriteriaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      let errors: ValidationErrors = {};
      qtArray.forEach(qt => {
        const addToCriteriaFlag = formControls[qt.localQuestionCode + "_k"];
        if (addToCriteriaFlag.value) {
          const criteria = formControls[qt.localQuestionCode + "_c"];
          if (!criteria.value) {
            errors[qt.localQuestionCode + "_c"] = "Mandatory";
          }
          // TODO validate expressions and combinations ?
        }
      });
      if (Object.keys(errors).length)
        return errors;
      else
        return null;
    };
    return new FormGroup(formControls, { validators: qtCriteriaValidator });
  }

  /**
   * Update the qtArray fields based on FormGroup
   * @param form a valid FormGroup created using toFormGroup
   */
  protected newQtArrayFromForm(qtArray: QuestionType[], form: FormGroup): QuestionType[] {
    let newQtArray: QuestionType[] = [];
    qtArray.forEach((qt) => {
      let newQt = JSON.parse(JSON.stringify(qt));
      // remove the fields added in toFormGroup
      delete newQt.fAddToCriteria;
      delete newQt.fFreeCriteria;
      delete newQt.fCneOptions;
      if (form.get(qt.localQuestionCode + "_k")!.value) {
        newQt.criteriaLabel = form.get(newQt.localQuestionCode + "_l")!.value;
        newQt.criteria = form.get(newQt.localQuestionCode + "_c")!.value;
      } else {
        newQt.criteriaLabel = undefined;
        newQt.criteria = undefined;
      }
      newQtArray.push(newQt);
    });
    return newQtArray;
  }
}
