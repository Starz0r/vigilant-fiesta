import { Component, OnInit, Input } from '@angular/core';
import { List } from '../list';
import { GameService } from '../game.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() lists: List[] = [];
  @Input() game_id: number;
  @Input() user_id: number;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    if (this.game_id && this.user_id) {
      this.gameService
        .getListsForUserGame(this.user_id,this.game_id)
        .subscribe(list => this.lists);
    }
  }

  getList(list_id: number): boolean {
    return this.lists.find(l => l.list_id == list_id) !== undefined;
  }

  setList(list_id: number, value: boolean): void {
    if (this.user_id) {
      this.gameService.updateList(this.user_id,this.game_id,list_id,value)
        .subscribe(result => console.log(result));
    }
  }
}
