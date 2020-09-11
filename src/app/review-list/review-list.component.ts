import { Component, OnInit, Input } from '@angular/core';
import { GameService }  from '../service/game.service';
import { Review } from '../model/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  @Input() showTitle: boolean = true;
  @Input() userId: number;
  @Input() gameId: number;
  @Input() reviews: Review[] = [];
  @Input() page: number = 0;
  @Input() limit: number = 5;

  loading: boolean = false;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    if (this.reviews.length == 0) {
      this.loading=true;
      this.getReviews();
    }
  }

  getReviews(): void {
    if (this.userId) {
      this.gameService.getReviewsForUser(this.userId)
        .subscribe(this.assignReviews.bind(this));
    } else if (this.gameId) {
      this.gameService.getReviewsForGame(this.gameId)
        .subscribe(this.assignReviews.bind(this));
    } else {
      this.gameService.getReviews(this.page,this.limit)
        .subscribe(this.assignReviews.bind(this));
    }
  }

  assignReviews(reviews: Review[]): void {
    this.reviews=reviews;
    this.loading=false;
  }
}