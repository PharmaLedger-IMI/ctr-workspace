import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from '../app.component';
import { MatchRequest } from '../matchrequest';
import { MatchRequestService } from '../matchrequest.service';


@Component({
    selector: 'app-matchrequest-detail',
    templateUrl: './matchrequest-detail.component.html',
    styleUrls: ['./matchrequest-detail.component.css']
})
export class MatchRequestDetailComponent implements OnInit {

    @Input() mr?: MatchRequest;
    @ViewChild('ghiForm')    ghiForm?:    ElementRef;
    @ViewChild('trialPrefs') trialPrefs?: ElementRef;
    @ViewChild('condition')  condition?:  ElementRef;
    @ViewChild('trial')      trial?:      ElementRef;
    ctrCollection: any[] = [];
    
    LForms: any;

    constructor(
        private appComponent: AppComponent,
        private route: ActivatedRoute,
        private mrService: MatchRequestService,
        private location: Location,
        private window: Window
    ) {
        this.LForms = (this.window as any)["LForms"];
        /* LForms notes - using as non-angular
           angular.json 
               architect.build.styles
                   "src/assets/lforms-29.0.3/styles/lforms.min.css"
               architect.build.scripts
                   "src/assets/lforms-29.0.3/lforms.min.js"   
        */
    }

    ngOnInit(): void {
        this.appComponent.setNavMenuHighlight("admin", "matchrequest", "Match Request Detail");
        this.getMatchRequest();
    }

    getMatchRequest(): void {
        const self = this;
        const keySSI = this.route.snapshot.paramMap.get('keyssi');
        if (!keySSI) {
            console.log("request keyssi is null");
            this.refreshMr(undefined);
            return;
        }
        this.mrService.getMatchRequest(keySSI)
            .subscribe(mr => { this.refreshMr(mr); });
    }

    refreshMr(mr?: MatchRequest) {
        console.log("Window.LForms", this.LForms);
        console.log("RefreshMR", mr);
        this.mr = mr;
        if (!this.ghiForm)
            return;
        this.ghiForm!.nativeElement.innerHTML = "empty MR";
        if (!this.trialPrefs)
            return;
        this.trialPrefs!.nativeElement.innerHTML = "empty MR";
        if (!this.condition)
            return;
        this.condition!.nativeElement.innerHTML = "empty MR";
        if (!this.trial)
            return;
        this.trial!.nativeElement.innerHTML = "empty MR";
        if (this.mr?.matchResult.dsuData?.ghiForm) {
            this.ghiForm!.nativeElement.innerHTML = "init...";
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.ghiForm, this.ghiForm.nativeElement, {});
        }
        if (this.mr?.dsuData?.trialPrefs) {
            this.trialPrefs!.nativeElement.innerHTML = "init...";
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.trialPrefsForm, this.trialPrefs.nativeElement, {});
        }
        if (this.mr?.dsuData?.condition) {
            this.condition!.nativeElement.innerHTML = "init...";
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.conditionForm, this.condition.nativeElement, {});
        }
        if (this.mr?.dsuData?.trial) {
            this.trial!.nativeElement.innerHTML = "init...";
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.trialForm, this.trial.nativeElement, {});
        }
    }

    goBack(): void {
        this.location.back();
    }

}
