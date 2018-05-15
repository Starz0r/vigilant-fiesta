import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../review';

import { GameService }  from '../game.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

}
