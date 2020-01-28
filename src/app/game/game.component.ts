import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Game } from '../game';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GameService } from '../game.service';
import { UserService } from '../user.service';

import { Review } from '../review';
import { ReviewListComponent } from '../review-list/review-list.component';
import { User } from '../user';
import { ReviewSubmission } from '../review-input/review-submission';
import { forkJoin } from 'rxjs';
import { Tag } from '../tag';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService,
    private location: Location
  ) {
    this.userService.userChange.subscribe(user=>this.user=user);
  }
  
  @ViewChild(ReviewListComponent, {static: false}) reviewList:ReviewListComponent;
  
  reviewInputExpanded: boolean = false;

  diffNames: string[] = [
    'Remarkably easy',
    'Beginner-Friendly',
    'Novice',
    'Challenge for new players',
    'Average',
    'Above Average',
    'Difficult',
    'Veteran',
    'Challenge for experienced players',
    'Extremely Challenging',
    'There\'s No Way!',
  ];

  rateNames: string[] = [
    'Unplayable',
    'Incredibly Bad',
    'Substandard',
    'Could use improving',
    'Mediocre',
    'Above Average',
    'Great',
    'Fantastic',
    'Amazing',
    'Incredible',
    'Perfect'
  ];

  @Input() game: Game;

  @Input() id: string;
  loading: boolean = true;
  notFound: boolean = false;

  userReview: Review = new Review;
  userTags: Tag[];

  tags: any[] = [];

  user: User;

  isRandom: boolean = false;

  ngOnInit() {
    if (this.id) {
      this.getGame(false);
    } else if (this.game) {
      this.id = ""+this.game.id;
      this.gameLoaded();
    } else if (!!this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getGame(true);
    }
  }

  reroll() {
    this.id = "random";
    this.getGame(true);
  }

  getUserReview(): void {
    if (this.id && this.user) {
      const userId = this.user.id;

      this.gameService.getReviewsForUserGame(+this.id,userId).subscribe(reviews => {
        if (reviews && reviews.length == 1) {
          this.userReview = reviews[0];
        }
      });

      this.gameService.getTagsForGame(+this.id,userId).subscribe(tags=>{
        this.userTags = tags;
      })

    }
  }

  gameLoaded() {
    this.getUserReview();
    this.getTags();
  }

  getGame(fromRoute: boolean): void {
    this.loading = true;
    this.gameService.getGame(this.id).subscribe(
      game => {
        //if we randomed, change the url so a copy-paste job will let
        //others come to the same game
        if (fromRoute) {
          this.isRandom = (this.id === "random");
          this.location.replaceState(`/game/${game.id}`);
        }
        
        this.id = ""+game.id;
        this.game = game;
        this.loading = false;
        this.gameLoaded();
      },
      error => {
        this.loading = false;
        if (error.name === 'HttpErrorResponse' 
          && error.status === 404) {
          this.notFound = true;
        } else {
          console.log(error);
        }
      }
    );
  }

  getTags(): void {
    this.gameService.getTagsForGame(+this.id).subscribe(tags => {
      this.tags = tags;
    })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.gameService.updateGame(this.game).subscribe(this.goBack);
  }

  rateColor(rating: number): string {
    return this.getHexColor(
      255-rating*128/100, 
      128+rating*128/100, 
      128);
  }

  diffColor(rating: number): string {
    return this.getHexColor(
      128+rating*128/100,
      128,
      255-rating*128/100);
  }

  getHexColor(r: number, g: number, b: number): string {
    return '#'+Math.floor((r<<16) + (g<<8) + b)
      .toString(16).padStart(6,'0');
  }

  async submitReview(review: ReviewSubmission) {
    console.log('test')
    const tags = review.tags;

    //create any non-existant tags
    const tagCreations = tags.filter(t=>!t.id).map(tag=>{
      return this.gameService.addTag(tag)
    });
    const createdTags = await forkJoin(tagCreations).toPromise();

    //replace all pending tags with created tags
    if (createdTags) {
      createdTags.forEach(ct=>{
        const index = tags.findIndex(t=>t.name==ct.name);
        if (index != -1) tags[index]=ct;
      });
    }

    //TODO: submit tags for game
    await this.gameService.setTags(this.game.id,tags.map(t=>t.id)).toPromise();

    //submit the review
    await this.gameService.submitReview(this.game.id,review.review).toPromise();
    
    //update tags
    this.gameService.getTagsForGame(this.game.id).subscribe(t => this.tags=t);
    //update reviews
    this.reviewList.getReviews();
    this.reviewInputExpanded = false;
  }
}
