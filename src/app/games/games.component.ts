import { Component, OnInit } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  filter: string;

  constructor() { }

  ngOnInit() {
  }

  /*filter(query: string): void {
    this.nextPage=0;
    this.getGames(this.nextPage,true,query);
  }*/
}
