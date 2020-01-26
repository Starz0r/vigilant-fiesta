import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameSearchParams } from '../game-search-params';
import { Tag } from '../tag';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  searchParams: GameSearchParams = {
    page: 0,
    limit: 1000,
  }
  tags: Tag[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() { }

  set filter(value: string) {
    this.searchParams = {...this.searchParams, q: value};
  }
  get filter() {
    return this.searchParams.q;
  }

  set title(value: string) {
    this.searchParams = {...this.searchParams, name: value};
  }
  get title() {
    return this.searchParams.name;
  }

  set author(value: string) {
    this.searchParams = {...this.searchParams, author: value};
  }
  get author() {
    return this.searchParams.author;
  }

  set minrate(value:number) {
    this.searchParams = {...this.searchParams, ratingFrom: value};
  }
  get minrate() {
    return this.searchParams.ratingFrom;
  }

  set maxrate(value:number) {
    this.searchParams = {...this.searchParams, ratingTo: value};
  }
  get maxrate() {
    return this.searchParams.ratingTo;
  }

  set mindiff(value:number) {
    this.searchParams = {...this.searchParams, difficultyFrom: value};
  }
  get mindiff() {
    return this.searchParams.difficultyFrom;
  }

  set maxdiff(value:number) {
    this.searchParams = {...this.searchParams, difficultyTo: value};
  }
  get maxdiff() {
    return this.searchParams.difficultyTo;
  }

  set hasDownload(value: boolean | undefined) {
    this.searchParams = {...this.searchParams, hasDownload: value};
  }
  get hasDownload() {
    return this.searchParams.hasDownload;
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
