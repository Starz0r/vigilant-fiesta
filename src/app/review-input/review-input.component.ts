import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../review';

@Component({
  selector: 'app-review-input',
  templateUrl: './review-input.component.html',
  styleUrls: ['./review-input.component.css']
})
export class ReviewInputComponent implements OnInit {

  @Input() review: Review = null;

  constructor() { }

  ngOnInit() {
    if (this.review === null) this.review = new Review();
  }

  update() {
    console.log(this.review);
  }

}
