import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[];
  nextPage: number;
  term: FormControl = new FormControl();

  constructor(
    private gameService: GameService
  ) {
    this.term.valueChanges.pipe(debounceTime(400))
      .subscribe(query => typeof query === 'string' && this.filter(query));
  }

  ngOnInit() {
    this.games = [];
    this.nextPage = 0;
    this.getGames(0,true);
  }

  getGames(page: number, fresh: boolean, query: string = null): void {
    this.gameService.getGames(query,page,50)
      .subscribe(games => {
        if (fresh) this.games = this.games = games;
        else this.games = this.games.concat(games);
        this.nextPage = page+1;
      });
  }

  onScroll() {
    this.getGames(this.nextPage,false);
  }

  filter(query: string): void {
    this.nextPage=0;
    this.getGames(this.nextPage,true,query);
  }
}
