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
    @ViewChild('formContainer') formContainer?: ElementRef;

    LForms: any;

    constructor(
        private appComponent: AppComponent,
        private route: ActivatedRoute,
        private mrService: MatchRequestService,
        private location: Location,
        private window: Window
    ) {
        this.LForms = (this.window as any)["LForms"];
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
            return;
        }
        this.mrService.getMatchRequest(keySSI)
            .subscribe(mr => { this.refreshMr(mr); });
    }

    refreshMr(mr: MatchRequest) {
        console.log("Window.LForms", this.LForms);
        console.log("formContainer", this.formContainer);
        console.log("RefreshMR", mr);
        this.mr = mr;
        if (this.formContainer) {
            this.formContainer!.nativeElement.innerHTML = "empty MR";
            if (this.mr?.dsuData?.ghiForm) {
                this.formContainer!.nativeElement.innerHTML = "ok2";
                this.LForms.Util.addFormToPage(this.mr?.dsuData?.ghiForm, this.formContainer.nativeElement, {});
            } else {
                console.log("NO GHI", this.mr);
            }
        }
    }

    goBack(): void {
        this.location.back();
    }

}
