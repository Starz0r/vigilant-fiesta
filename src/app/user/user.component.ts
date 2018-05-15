import { Component, OnInit, Input } from '@angular/core';
import { GameService }  from '../game.service';
import { PublicUser } from '../public-user';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: PublicUser;
  id: number;
  loading: boolean = true;
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit() {
    if (!this.user) {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.getUser();
    } else {
      this.id = this.user.id;
    }
  }

  getUser(): void {
    this.gameService.getUser(this.id).subscribe(
      user => {
        this.user = user;
        this.loading = false;
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
