import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../review';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;

  constructor(
    private userService: UserService, 
    private gameService: GameService,
    private snackBar: MatSnackBar) { }

  isLiked: boolean = false;

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.gameService.isLiked(this.review.id,this.userService.getUser().id).subscribe(l => {
        this.isLiked = l.liked;
      });
    }
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  likeReview() {
    this.gameService.likeReview(this.review.id,this.userService.getUser().id).subscribe(
      result => {
        this.review.like_count++;
        this.isLiked = true;
      }, 
      error => {
        this.snackBar.open(`An error occurred. Please try again later!`,null,{
          duration: 5000,
        });
        console.log(error);
      }
    )
  }

  unlikeReview() {
    this.gameService.unlikeReview(this.review.id,this.userService.getUser().id).subscribe(
      result => {
        this.review.like_count--;
        this.isLiked = false;
      }, 
      error => {
        this.snackBar.open(`An error occurred. Please try again later!`,null,{
          duration: 5000,
        });
        console.log(error);
      }
    )
  }

}
