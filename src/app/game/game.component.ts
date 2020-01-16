import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Game } from '../game';
import { Screenshot } from '../screenshot';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GameService } from '../game.service';
import { UserService } from '../user.service';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, 
  NgxGalleryImageSize } from 'ngx-gallery';
import { Review } from '../review';
import { ReviewListComponent } from '../review-list/review-list.component';

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
  ) { }
  
  @ViewChild(ReviewListComponent, {static: false}) reviewList:ReviewListComponent;
  
  reviewInputExpanded: boolean = false;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getGame();
    this.getUserReview();
  }

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

  id: string;
  loading: boolean = true;
  notFound: boolean = false;

  userReview: Review = new Review;

  galleryOptions: NgxGalleryOptions[] = [
    {
        width: '400px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: NgxGalleryImageSize.Contain,
        imagePercent: 100,
        imageDescription: true,
        imageAutoPlay: true,
        imageAutoPlayInterval: 5000,
        imageAutoPlayPauseOnHover: true
    }
  ];
  galleryImages: NgxGalleryImage[] = [];

  getUserReview(): void {
    if (this.id && this.isLoggedIn()) {
      const userId = this.userService.getUser().id;
      this.gameService.getReviewsForUserGame(+this.id,userId).subscribe(reviews => {
        if (reviews && reviews.length == 1) {
          this.userReview = reviews[0];
        }
      });
    }
  }

  getGame(): void {
    this.gameService.getGame(this.id).subscribe(
      game => {
        this.game = game;
        this.loading = false;
        this.getScreenshots();
        //if we randomed, change the url so a copy-paste job will let
        //others come to the same game
        this.location.replaceState(`/game/${game.id}`);
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

  getScreenshots(): void {
    this.gameService.getScreenshotsForGame(this.game.id).subscribe(
      screenshots => {
        this.galleryImages = this.shuffle(screenshots
        .map(screenshot => Object.assign(new Screenshot(), screenshot))
        .map(ss => new NgxGalleryImage({
            small: ss.getUrl(),
            medium: ss.getUrl(),
            big: ss.getUrl(),
            description: ss.user_name + (ss.description?": " + ss.description:"")
          })
        ));
      }
    );
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

  shuffle(array: any[]): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  submitReview(review: Review) {
    this.gameService.submitReview(this.game.id,review).subscribe(_ => {
      this.reviewList.getReviews();
      this.reviewInputExpanded = false;
    });
  }

}
