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

  private clinicalTrialGhilUrl = environment.restBaseUrl+"/ctrial/clinicaltrial/"; // + ctrId + '/ghi'

  constructor(private http: HttpClient) { }

  getGhiFormGroup(ctrId: string, callback: (ghiQtArray: QuestionType[], ghiQtFormGroup: FormGroup) => void) {
    const self = this;
    this.getGhiQtArray(ctrId).subscribe(ghiQtArray => {
      let ghiQtArray1 = ghiQtArray; // subset [ghiQtArray[0],ghiQtArray[3]];
      console.log(ghiQtArray);
      const fg = self.toFormGroup(ghiQtArray1);
      return callback(ghiQtArray1, fg);
    });
  }

  protected getGhiQtArray(ctrId: string): Observable<QuestionType[]> {
    const url = this.clinicalTrialGhilUrl+ctrId+"/ghi";
    console.log("Url: "+url);
    return this.http.get<QuestionType[]>(url)
    .pipe(
      tap(_ => console.log(`fetched QuestionType[]`)),
      catchError(this.handleError<QuestionType[]>(`clinicaltrial/id/ghi`))
    );
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
      return of(result as T);
    };
  }

  protected toFormGroup(qtArray: QuestionType[]) : FormGroup {
    const formControls: any = {};

    qtArray.forEach(qt => {
      qt.fAddToCriteria = (qt.criteria) ? true : false;
      if (qt.dataType.code=="YNNS"
        && (!qt.criteria || qt.criteria == "YNNS_YNS" || qt.criteria == "YNNS_NNS")
      ) {
        qt.fFreeCriteria="YNNS";
      } else {
        qt.fFreeCriteria="-";
      }
      if (qt.dataType.code=="CNE") {
        let sep = ' ; ';
        qt.fCneOptions = '';
        qt.answers!.forEach((qtAnswer) => {
          qt.fCneOptions += sep + qtAnswer.text;
          sep = ' / ';
        });
      }
      formControls[qt.localQuestionCode+"_k"] = new FormControl(qt.fAddToCriteria || false);
      formControls[qt.localQuestionCode+"_l"] = new FormControl(qt.criteriaLabel || '');
      formControls[qt.localQuestionCode+"_c"] = new FormControl(qt.criteria || '');
    });
    const qtCriteriaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      let errors : ValidationErrors = {};
      qtArray.forEach(qt => {
        const addToCriteriaFlag = formControls[qt.localQuestionCode+"_k"];
        if (addToCriteriaFlag.value) {
          const criteria = formControls[qt.localQuestionCode+"_c"];
          if (!criteria.value) {
            errors[qt.localQuestionCode+"_c"] = "Mandatory";
          }
        }
      });
      if (Object.keys(errors).length)
        return errors;
      else
        return null;
    };
    return new FormGroup(formControls, { validators: qtCriteriaValidator });
  }
}
