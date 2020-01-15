import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Review } from '../review';
import { MatSliderChange } from '@angular/material/slider';
import { GameService } from '../game.service';

@Component({
  selector: 'app-review-input',
  templateUrl: './review-input.component.html',
  styleUrls: ['./review-input.component.css']
})
export class ReviewInputComponent implements OnInit {

  @Input() review: Review = null;
  
  @Output() onSubmit: EventEmitter<Review> = new EventEmitter();

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    if (this.review === null) {
      this.review = new Review();
      //set to -1 so the slider starts at minimum; but this is the same as null
      this.review.rating = -1;
      this.review.difficulty = -1;
    }
  }

  update() {
    this.onSubmit.emit(this.review);
  }

  refreshDiff(event: MatSliderChange) {
    this.review.difficulty = event.value;
  }

  refreshRate(event: MatSliderChange) {
    this.review.rating = event.value;
  }

}
