import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Game } from '../model/game';
import { GameService } from '../service/game.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { GameSearchParams } from '../game-search-params';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard-games',
  templateUrl: './dashboard-games.component.html',
  styleUrls: ['./dashboard-games.component.css']
})
export class DashboardGamesComponent implements OnInit, OnChanges, OnDestroy {

  games: Game[] = [];
  total: number = 0;
  loading: boolean = true;

  columnsToDisplay=['name','date_created','rating','difficulty'];

  @Input() params: GameSearchParams = {
    page:0,limit:10
  };

  page(event: any) {
    this.params = {
      ...this.params,
      page: event.pageIndex,
      limit: event.pageSize
    }
    this.getGames();
  }
  sort(event: Sort) {
    this.params = {
      ...this.params,
      orderCol: event.active||'date_created',
      orderDir: event.direction,
      page: 0,
    }
    this.getGames();
  }

  debounceSearch: Subject<SimpleChanges> = new Subject<SimpleChanges>();

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.getGames();

    this.debounceSearch
      .pipe(debounceTime(300))
      .subscribe(() => {
        console.log('change')
        this.getGames();
      });
  }

  ngOnDestroy() {
    this.debounceSearch.unsubscribe();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.debounceSearch.next(changes)
  }

  getGames(): void {
    this.gameService.getGames(this.params).subscribe(games => {
        this.games = games.games;
        if (games.total) this.total = games.total;
        this.loading = false;
      });
  }

}
