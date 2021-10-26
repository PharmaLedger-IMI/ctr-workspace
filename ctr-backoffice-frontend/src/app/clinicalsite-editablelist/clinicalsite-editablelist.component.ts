import { Component, Input, OnInit } from '@angular/core';

// inspired on https://stackblitz.com/edit/angular-editable-list?file=src%2Fapp%2Fcomponents%2Flist-item%2Flist-item.component.ts

@Component({
  selector: 'app-clinicalsite-editablelist',
  templateUrl: './clinicalsite-editablelist.component.html',
  styleUrls: ['./clinicalsite-editablelist.component.css']
})
export class ClinicalSiteEditableListComponent implements OnInit {

  @Input() ctr!: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
