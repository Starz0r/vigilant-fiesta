import { Component, OnInit, Input } from '@angular/core';
import { GameService }  from '../game.service';
import { PublicUser } from '../public-user';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
import { GameSearchParams } from '../game-search-params';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: PublicUser;
  @Input() id: number;
  loading: boolean = true;
  notFound: boolean = false;

  isMe: boolean = false;

  meUser: User;

  badges: any[];

  gameListParams: GameSearchParams = {
    page: 0,
    limit: 25
  };

  ownerListParams: GameSearchParams = {
    page: 0,
    limit: 25
  };

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userService.userChange.subscribe(user=>this.meUser=user);
  }

  ngOnInit() {
    if (this.id) {
      this.getUser();
    } else if (this.user) {
      this.id = this.user.id;
      this.userReady();
    } else if (!!this.route.snapshot.paramMap.get('id')) {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.getUser();
    }
  }

  userReady() {
    this.gameListParams = {
      page: 0, limit: 25,
      reviewedByUserId: this.user?this.user.id:undefined
    };
    this.ownerListParams = {
      page: 0, limit: 25,
      ownerUserId: this.user?this.user.id:undefined
    };
    this.getBadges();
  }

  getBadges() {
    this.userService.getBadges(this.user.id).subscribe(badges=>{this.badges=badges});
  }

  getUser(): void {
    this.gameService.getUser(this.id).subscribe(
      user => {
        this.user = user;
        this.loading = false;

        if (this.meUser && this.meUser.id==this.user.id) {
          this.isMe = true;
        }
        this.userReady();
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

  select(badge_id: number) {
    if (!this.isMe) return;
    const last_badge = this.user.selected_badge;
    this.user.selected_badge = badge_id;
    console.log('selecting '+badge_id)
    this.userService.updateUser({
      id:this.user.id,
      selected_badge: badge_id,
    }).subscribe(r=>{
    },e=>{
      this.snackBar.open("Unable to switch badge! Try again later.",null,{
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
      this.user.selected_badge = last_badge;
    })
  }
}
