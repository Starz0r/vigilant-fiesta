import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../review';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';
import { Tag } from '../tag';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() showTitle: boolean = true;
  @Input() showRatings: boolean = true;
  @Input() review: Review;
  @Input() id: string;

  tags: Tag[] = [];

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
    const review = this.review;
    if (this.user) {
      this.gameService.isLiked(review.id,this.user.id).subscribe(l => {
        this.isLiked = l.liked;
      });
    }

    if (review.game_id) {
      this.gameService.getTagsForGame(review.game_id,review.user_id)
      .subscribe(tags=>{
        this.tags = tags;
      })
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
