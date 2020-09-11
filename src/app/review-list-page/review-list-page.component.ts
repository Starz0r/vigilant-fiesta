import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../service/game.service';
import { Review } from '../model/review';

@Component({
  selector: 'app-review-list-page',
  templateUrl: './review-list-page.component.html',
  styleUrls: ['./review-list-page.component.scss']
})
export class ReviewListPageComponent implements OnInit {

  page = 0;
  limit = 25;

  constructor() { }

  ngOnInit() {
  }
}
