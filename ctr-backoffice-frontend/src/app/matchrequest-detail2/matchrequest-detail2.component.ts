import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from '../app.component';
import { MatchRequest } from '../matchrequest';
import { MatchRequestService } from '../matchrequest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Application } from '../application';


@Component({
    selector: 'app-matchrequest-detail2',
    templateUrl: './matchrequest-detail2.component.html',
    styleUrls: ['./matchrequest-detail2.component.css']
})
export class MatchRequestDetail2Component implements OnInit, OnChanges {

    @Input() app?: Application;
    @Input() mrKeySsi?: string;
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
        private window: Window,
        private sanitizer: DomSanitizer
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

    ngOnChanges() : void {
        //this.appComponent.setNavMenuHighlight("admin", "matchrequest", "Match Request Detail");
        this.appComponent.sideNavOpened = false;
        this.getMatchRequest();
    }   

    getMatchRequest(): void {
        const self = this;
        let keySSI = this.route.snapshot.paramMap.get('keyssi');
        if (!keySSI) {
            if (this.mrKeySsi)
                keySSI = this.mrKeySsi;
        }
        if (!keySSI) {
            console.log("request keyssi is null", this.mrKeySsi);
            this.refreshMr(undefined);
            return;
        }
        if (!this.app) {
            console.log("request app is null");
            this.refreshMr(undefined);
            return;
        }
        this.mrService.getMatchRequest(keySSI)
            .subscribe(mr => { this.refreshMr(mr); });
    }

    refreshMr(mr?: MatchRequest) {
        console.log("Window.LForms", this.LForms);
        if (mr?.matchResult?.dsuData?.trials) {
            mr?.matchResult?.dsuData?.trials.forEach( (mtct : any) => {
                // mtct is of type MatchResultClinicalTrial that only exists on REST server
                if (mtct && mtct.criteriaExplained) {
                    mtct['criteriaExplainedS'] = this.sanitizer.bypassSecurityTrustHtml(mtct.criteriaExplained);
                }
            });
        }
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
            this.filterItemsByCtrId(this.mr?.matchResult?.dsuData?.ghiForm, this.app?.clinicalTrial.id, "TITLE");
            this.filterItemsExcludeDebug(this.mr?.matchResult?.dsuData?.ghiForm, "TITLE");
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.ghiForm, this.ghiForm.nativeElement, {});
        }
        if (this.mr?.dsuData?.trialPrefs) {
            this.trialPrefs!.nativeElement.innerHTML = "init...";
            this.filterItemsByCtrId(this.mr?.matchResult?.dsuData?.trialPrefsForm, this.app?.clinicalTrial.id, "TITLE");
            this.filterItemsExcludeDebug(this.mr?.matchResult?.dsuData?.trialPrefsForm, "TITLE");
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.trialPrefsForm, this.trialPrefs.nativeElement, {});
        }
        if (this.mr?.dsuData?.condition) {
            this.condition!.nativeElement.innerHTML = "init...";
            this.filterItemsByCtrId(this.mr?.matchResult?.dsuData?.conditionForm, this.app?.clinicalTrial.id, "TITLE");
            this.filterItemsExcludeDebug(this.mr?.matchResult?.dsuData?.conditionForm, "TITLE");
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.conditionForm, this.condition.nativeElement, {});
        }
        if (this.mr?.dsuData?.trial) {
            this.trial!.nativeElement.innerHTML = "init...";
            this.filterItemsByCtrId(this.mr?.matchResult?.dsuData?.trialForm, this.app?.clinicalTrial.id); // filter all items, not just TITLE items
            this.filterItemsExcludeDebug(this.mr?.matchResult?.dsuData?.trialForm, "TITLE");
            this.LForms.Util.addFormToPage(this.mr?.matchResult?.dsuData?.trialForm, this.trial.nativeElement, {});
        }
    }

    /**
     * Eliminate form items that do have ctrIdCollection extension, but do not contain ctrId in that collection.
     * @param aForm LHC-Forms structure aForm.items must be an array. aForm.items is replaced by a new array.
     * @param ctrId ClinicalTrial.id
     * @param [itemDataType] if defined, than this filtering only occurs for item.dataType==itemDataType
     */
    filterItemsByCtrId(aForm: any, ctrId: string, itemDataType?: string) {
        const items = aForm.items;
        if (!items || !Array.isArray(items))
            return;
        let newItems = items.filter((item) => {
            if (itemDataType && item.dataType!=itemDataType)
                return true; // dataType does not match,
            if (!item['ctrExtension'] || !item['ctrExtension']['ctrIdCollection'])
                return true; // no ctrExtension
            const ctrIdCollection = item['ctrExtension']['ctrIdCollection'];
            if (!Array.isArray(ctrIdCollection))            
                return true;
            const ctrIdFound : boolean = ctrIdCollection.indexOf(ctrId) >= 0;
            return ctrIdFound;
        });
        aForm.items = newItems;
    }

    /**
     * Eliminate form items that have the ctrExtension.debug protery.
     * @param aForm LHC-Forms structure aForm.items must be an array. aForm.items is replaced by a new array.
     * @param [itemDataType] if defined, than this filtering only occurs for item.dataType==itemDataType
     */
    filterItemsExcludeDebug(aForm: any, itemDataType?: string) {
        const items = aForm.items;
        if (!items || !Array.isArray(items))
            return;
        let newItems = items.filter((item) => {
            if (itemDataType && item.dataType!=itemDataType)
                return true; // dataType does not match,
            console.log("Filter", item);
            if (!item['ctrExtension'] || !item['ctrExtension']['debug'])
                return true; // no ctrExtension.debug property
            return false;
        });
        aForm.items = newItems;
    }

    goBack(): void {
        this.location.back();
    }

}
