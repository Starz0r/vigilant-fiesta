import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Game } from '../model/game';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GameService } from '../service/game.service';
import { UserService } from '../service/user.service';

import { Review } from '../model/review';
import { ReviewListComponent } from '../review-list/review-list.component';
import { User } from '../model/user';
import { ReviewSubmission } from '../review-input/review-submission';
import { forkJoin, Observable, of } from 'rxjs';
import { Tag } from '../model/tag';
import { MatDialog } from '@angular/material/dialog';
import { ScreenshotAddDialogComponent } from '../screenshot-add-dialog/screenshot-add-dialog.component';
import { SpeedrumComService, SRCategory, SRLeaderboardRun, SRPlayer, SRUser } from '../service/speedrum-com.service';
import { map } from 'rxjs/operators';

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
    private location: Location,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private speedrunService: SpeedrumComService
  ) {
    this.userService.userChange.subscribe(user=>this.user=user);
    this.players = new Map<string,SRUser>();
  }
  
  @ViewChild(ReviewListComponent) reviewList:ReviewListComponent;
  
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

  editing: boolean = false;

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

  saveChanges() {
    this.gameService.updateGame(this.game).subscribe(game => {
      if (!game) {
        console.log('game return was null');
        this.snackBar.open("Game Update Failed!",null,{
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        return;
      }
      this.game = game;
      this.editing = false;
      this.snackBar.open("Game Updated!",null,{
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    },
    error => {
      console.log(error);
      this.snackBar.open("Game Update Failed!",null,{
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    });
  }

  reroll() {
    this.id = "random";
    this.getGame(true);
  }

  showScreenshotDialog() {
    const dialogRef = this.dialog.open(ScreenshotAddDialogComponent, {
      width: '350px', data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gameService.addScreenshot(
        this.game.id,
        result.description,
        result.file
      ).subscribe(ss => {
        this.snackBar.open("Screenshot Submitted! Once an admin approves it, it will be added.",null,{
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      },
      error => {
        this.snackBar.open("Failed to submit screenshot, try again later!",null,{
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      });
    });
  }

  showManageScreenshotDialog() {
    const dialogRef = this.dialog.open(ScreenshotAddDialogComponent, {
      width: '350px', data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gameService.addScreenshot(
        this.game.id,
        result.description,
        result.file
      ).subscribe(ss => {
        this.snackBar.open("Screenshot Submitted! Once an admin approves it, it will be added.",null,{
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      },
      error => {
        this.snackBar.open("Failed to submit screenshot, try again later!",null,{
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      });
    });
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
    this.getSpeedrunCategories();
  }

  categories: SRCategory[];
  selCategory: SRCategory;

  getSpeedrunCategories() {
    if (this.game.urlSpdrn) {
      this.speedrunService.getCategories(this.game.urlSpdrn)
      .subscribe(categories => {
        this.categories = categories;
        this.selectCategory(this.categories[0]);
      }, error => {
        console.log("failed to get speedrun categories");
        console.log(error);
      });
    }
  }
  
  selectCategory(category: SRCategory) {
    this.selCategory = category;
    this.runs = [];
    this.getSpeedrunLeaderboard(category);
  }

  runs: SRLeaderboardRun[];
  players: Map<string,SRUser>;
  getSpeedrunLeaderboard(category: SRCategory) {
    this.speedrunService.getLeaderboard(this.game.urlSpdrn,category.id)
    .subscribe(runs => {
      console.log(runs);
      this.runs = runs.slice(0,5);
      this.runs.forEach(run => 
        this.speedrunService.getPlayer(run.run.players[0]).subscribe(user => 
          this.players[user.id] = user
        )
      );
    }, error => {
      console.log("failed to get speedrun leaderboard for category: "+category.id);
      console.log(error);
    });
  }

  getUserName(player: SRPlayer): Observable<string|undefined> {
    if (!player) return of("N/A");
    return this.speedrunService.getPlayer(player)
      .pipe(map(user=>user?"N/A":""+user.names.international));
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
    if (this.game.ownerId == this.user.id) {
      this.gameService.getReviewsForUserGame(this.game.id,this.user.id)
        .subscribe(r => {
          if (r.length == 1) this.game.ownerBio = r[0];
          else delete this.game.ownerBio;
        });
    }
  }
}
