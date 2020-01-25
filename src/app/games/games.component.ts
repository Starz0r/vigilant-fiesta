import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameSearchParams } from '../game-search-params';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  searchParams: GameSearchParams = {
    page: 0,
    limit: 1000
  }

  set filter(value: string) {
    this.searchParams = {...this.searchParams, q: value};
  }

  get filter() {
    return this.searchParams.q;
  }

  constructor() { }

  ngOnInit() {

  }
}
