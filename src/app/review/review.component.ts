import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../review';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;
  @Input() id: string;

  constructor(
    private userService: UserService, 
    private gameService: GameService,
    private snackBar: MatSnackBar) {
      this.userService.userChange.subscribe(user=>this.user=user);
    }

  user: User;
  isLiked: boolean = false;

  ngOnInit() {
    if (this.id) {
      this.getReview(+this.id);
    } else if (this.review) {
      this.id = ""+this.review.id;
      this.reviewLoaded();
    }
  }

  getReview(id: number) {
    this.gameService.getReview(id).subscribe(r => {
      this.review = r;
      this.reviewLoaded();
    })
  }

  reviewLoaded() {
    if (this.user) {
      this.gameService.isLiked(this.review.id,this.user.id).subscribe(l => {
        this.isLiked = l.liked;
      });
    }
  }

  likeReview() {
    this.gameService.likeReview(this.review.id,this.user.id).subscribe(
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
    this.gameService.unlikeReview(this.review.id,this.user.id).subscribe(
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
