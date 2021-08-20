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

  getFormGroup(ctrId: string, stage: string, callback: (ghiQtArray: QuestionType[], ghiQtFormGroup: FormGroup) => void) {
    const self = this;
    this.getQtArray(ctrId, stage).subscribe(qtArray => {
      console.log(qtArray);
      let qtArrayAux = qtArray; // subset [ghiQtArray[0],ghiQtArray[3]];
      const fg = self.toFormGroup(qtArrayAux);
      return callback(qtArrayAux, fg);
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

  post(ctr: any): Observable<any> {
    const url = this.borestBaseCtrUrl;
    console.log("Url: " + url);
    return this.http.post<any>(url, ctr, httpOptions)
      .pipe(
        tap(_ => console.log(`posted ClinicalTrial`)),
        catchError(this.handleError<any>(`POST clinicaltrial`))
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
      if (qt.dataType.code == "YNNS"
        && (!qt.criteria || qt.criteria == "YNNS_YNS" || qt.criteria == "YNNS_NNS")
      ) {
        qt.fFreeCriteria = "YNNS";
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
