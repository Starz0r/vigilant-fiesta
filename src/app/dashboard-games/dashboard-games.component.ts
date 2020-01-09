import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard-games',
  templateUrl: './dashboard-games.component.html',
  styleUrls: ['./dashboard-games.component.css']
})
export class DashboardGamesComponent implements OnInit, OnChanges {

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
  
  ngOnChanges(changes: SimpleChanges) {
    /*const currentItem: SimpleChange = changes.filter;
    console.log('prev value: ', currentItem.previousValue);
    console.log('got item: ', currentItem.currentValue);
    if(currentItem.currentValue){
      this.scannedUPC = changes.item.currentValue.upc;
    }
    this.suppliedQuantity = 0;*/
  }

  getGames(): void {
    this.gameService.getGames(this.filter,this.start,this.limit,this.sort,this.direction)
      .subscribe(games => {
        this.games = games;
        this.loading = false;
      });
  }

}
