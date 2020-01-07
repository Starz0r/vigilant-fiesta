import { Component, OnInit, Input } from '@angular/core';
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

  columnsToDisplay=['game','released','rating','difficulty'];

  @Input()
  filter: string = null;
  @Input()
  start: number = 0;
  @Input()
  limit: number = 25;
  @Input()
  sort: string = "date_created";
  @Input()
  direction: string = "DESC";

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames(this.filter,this.start,this.limit,this.sort,this.direction)
      .subscribe(games => {
        this.games = games;
        this.loading = false;
      });
  }

}
