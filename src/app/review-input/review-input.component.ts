import {ENTER,SPACE} from '@angular/cdk/keycodes';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Review } from '../review';
import { MatSliderChange } from '@angular/material/slider';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../tag';
import { GameService } from '../game.service';
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

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    let value = event.value;

    value = (value || '').trim();
    if (!value) return;

    //prevent dupes
    let found = false;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].name.toLowerCase() === input.value.toLowerCase()) {
        found = true;
        break;
      }
    }
    if (found) return;

    //attempt to look up the tag to get the id
    this.gameService.getTagByName(value).subscribe(tag => {
      if (tag) { //add the tag from the server
        this.tags.push(tag);
      } else { //add tag with no id, we'll get one later
        this.tags.push({name: value.trim()});
      }
    });

    // Reset the input value
    if (input) input.value = '';
  }

  removeTag(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
