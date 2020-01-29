import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../game';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  user: User;

  game: Game = {};
  
  name: string;
  author: string;
  url: string;

  accept: boolean = false;

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.userService.userChange.subscribe(u => {
      if (!u) {
        this.router.navigate(['/'])
        return;
      }
      this.user = u
    })
  }

  ngOnInit() {
  }

  ok() {
    this.gameService.addGame(this.game).subscribe(game=>{
      this.snackBar.open("Game Submitted!",null,{
        duration: 5000,
      });
      this.router.navigate([`/game/${game.id}`])
    });
  }

}
