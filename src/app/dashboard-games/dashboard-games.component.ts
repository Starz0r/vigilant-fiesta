import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-games',
  templateUrl: './dashboard-games.component.html',
  styleUrls: ['./dashboard-games.component.css']
})
export class DashboardGamesComponent implements OnInit, OnChanges, OnDestroy {

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

  @Input()
  reviewedByUserId: number = null;

  debounceSearch: Subject<SimpleChanges> = new Subject<SimpleChanges>();

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.getGames();

    this.debounceSearch
      .pipe(debounceTime(300))
      .subscribe(() => {
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
    this.gameService.getGames(this.filter,this.reviewedByUserId,this.start,this.limit,this.sort,this.direction)
      .subscribe(games => {
        this.games = games;
        this.loading = false;
      });
  }

}
