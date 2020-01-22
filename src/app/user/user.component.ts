import { Component, OnInit, Input } from '@angular/core';
import { GameService }  from '../game.service';
import { PublicUser } from '../public-user';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';

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

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService
  ) {
    this.userService.userChange.subscribe(user=>this.meUser=user);
  }

  ngOnInit() {
    if (this.id) {
      this.getUser();
    } else if (this.user) {
      this.id = this.user.id;
    } else if (!!this.route.snapshot.paramMap.get('id')) {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.getUser();
    }
  }

  getUser(): void {
    this.gameService.getUser(this.id).subscribe(
      user => {
        this.user = user;
        this.loading = false;

        if (this.meUser && this.meUser.id==this.user.id) {
          this.isMe = true;
        }
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
}
