import { ActivatedRoute } from '@angular/router';
import { Component, OnInit , Input} from '@angular/core';

import { AppComponent } from '../app.component';
import {Locale} from '../locale';
import {LocaleService} from '../locale.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.css']
})
export class LocaleComponent implements OnInit {

  locale: Locale | undefined;
  constructor(
    private appComponent: AppComponent, 
    private route: ActivatedRoute,
    private localeService: LocaleService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.appComponent.setNavMenuHighlight("admin", "locale", "Locale Detail");
    this.getLocale();
  }

  getLocale(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.localeService.getLocale(code)
        .subscribe(locale => this.locale = locale);
    }
  }

  save(): void {
    if (this.locale !== undefined) {
      this.localeService.updateLocale(this.locale)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
