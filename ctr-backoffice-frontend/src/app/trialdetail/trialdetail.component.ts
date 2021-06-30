import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-trialdetail',
  templateUrl: './trialdetail.component.html',
  styleUrls: ['./trialdetail.component.css']
})
export class TrialdetailComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  navigateBack(): void {
    this.location.back();
  }

}
