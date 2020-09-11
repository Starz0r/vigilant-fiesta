import {ENTER,SPACE} from '@angular/cdk/keycodes';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Review } from '../model/review';
import { MatSliderChange } from '@angular/material/slider';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../model/tag';
import { GameService } from '../service/game.service';
import { ReviewSubmission } from './review-submission';

@Component({
  selector: 'app-review-input',
  templateUrl: './review-input.component.html',
  styleUrls: ['./review-input.component.css']
})
export class ReviewInputComponent implements OnInit {

  @Input() review: Review = null;

  @Input() tags: Tag[] = [];
  
  @Output() onSubmit: EventEmitter<ReviewSubmission> = new EventEmitter();

  readonly separatorKeysCodes: number[] = [ENTER,SPACE];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    if (this.review === null) {
      this.review = new Review();
      //set to -1 so the slider starts at minimum; but this is the same as null
      this.review.rating = -1;
      this.review.difficulty = -1;
    }
  }

  update() {
    this.onSubmit.emit({review:this.review,tags:this.tags});
  }

  refreshDiff(event: MatSliderChange) {
    this.review.difficulty = event.value;
  }

  refreshRate(event: MatSliderChange) {
    this.review.rating = event.value;
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

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
