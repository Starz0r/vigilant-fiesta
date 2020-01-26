import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../game';
import { GameSearchParams } from '../game-search-params';
import { Tag } from '../tag';
import { GameService } from '../game.service';
import { SearchStateService } from '../search-state.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {
  defaultParams: GameSearchParams = {
    page: 0,
    limit: 25,
  }

  searchParams: GameSearchParams = {
    page: 0,
    limit: 25,
  }
  tags: Tag[] = [];

  constructor(
    private gameService: GameService,
    private searchStateService: SearchStateService) { }

  ngOnInit() {
    this.searchParams = this.searchStateService.getState();
  }

  ngOnDestroy() {
    this.searchStateService.setState(this.searchParams);
  }

  deepEqual(a,b:any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  clearAll() {
    this.searchParams = this.defaultParams;
  }

  set filter(value: string) {
    if (!value) value = undefined;
    this.searchParams = {...this.searchParams, q: value};
  }
  get filter() {
    return this.searchParams.q;
  }

  set title(value: string) {
    if (!value) value = undefined;
    this.searchParams = {...this.searchParams, name: value};
  }
  get title() {
    return this.searchParams.name;
  }

  set author(value: string) {
    if (!value) value = undefined;
    this.searchParams = {...this.searchParams, author: value};
  }
  get author() {
    return this.searchParams.author;
  }

  set minrate(value:number) {
    if (value == -1) value = undefined;
    this.searchParams = {...this.searchParams, ratingFrom: value};
  }
  get minrate() {
    if (this.searchParams.ratingFrom == undefined) return -1;
    return this.searchParams.ratingFrom;
  }

  set maxrate(value:number) {
    if (value == -1) value = undefined;
    this.searchParams = {...this.searchParams, ratingTo: value};
  }
  get maxrate() {
    if (this.searchParams.ratingTo == undefined) return -1;
    return this.searchParams.ratingTo;
  }

  set mindiff(value:number) {
    if (value == -1) value = undefined;
    this.searchParams = {...this.searchParams, difficultyFrom: value};
  }
  get mindiff() {
    if (this.searchParams.difficultyFrom == undefined) return -1;
    return this.searchParams.difficultyFrom;
  }

  set maxdiff(value:number) {
    if (value == -1) value = undefined;
    this.searchParams = {...this.searchParams, difficultyTo: value};
  }
  get maxdiff() {
    if (this.searchParams.difficultyTo == undefined) return -1;
    return this.searchParams.difficultyTo;
  }

  set hasDownload(value: string | boolean) {
    if (value == "yes") value = true;
    else if (value == "no") value = false;
    else value = undefined;
    this.searchParams = {...this.searchParams, hasDownload: <boolean>value};
  }
  get hasDownload() {
    if (this.searchParams.hasDownload===true) return "yes";
    if (this.searchParams.hasDownload===false) return "no";
    return "either";
  }

  removeTag(tag: Tag) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTag(tagName: string): void {
    //attempt to look up the tag to get the id
    this.gameService.getTagByName(tagName).subscribe(tag => {
      if (tag) { //add the tag from the server
        this.tags.push(tag);
      } else { //add tag with no id, we'll get one later
        this.tags.push({name: tagName.trim()});
      }
    });
  }
}
