import { Component, OnInit } from '@angular/core';
import {Locale} from '../locale';
import {Observable, Subject} from 'rxjs';
import {LocaleService} from '../locale.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-locale-search',
  templateUrl: './locale-search.component.html',
  styleUrls: ['./locale-search.component.css']
})
export class LocaleSearchComponent implements OnInit {

  locales$: Observable<Locale[]> | undefined;
  private searchTerms = new Subject<string>();

  constructor(private localeService: LocaleService) { }

  ngOnInit(): void {
    this.locales$ = this.searchTerms.pipe(
      // 300 ms between requests (regardless if the term changed r not)
      debounceTime(300),
      // Ignore if it's the same
      distinctUntilChanged(),
      // change observables if the term changed
      switchMap((term: string) => this.localeService.searchLocales(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
