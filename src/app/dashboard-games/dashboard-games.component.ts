import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard-games',
  templateUrl: './dashboard-games.component.html',
  styleUrls: ['./dashboard-games.component.css']
})
export class DashboardGamesComponent implements OnInit {

  games: Game[] = [];
  loading: boolean = true;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames(null,0,25,'date_created','DESC')
      .subscribe(games => {
        this.games = games;
        this.loading = false;
      });
  }

}
