import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from '../tag';
import {ENTER,SPACE} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  @Input() tags: Tag[] = [];

  /** Raised when a tag is removed from the list */
  @Output() remove = new EventEmitter<Tag>();

  /** Raised when a tag is added to the list - handler will need to
   *  check if the tag exists and add the fully initialized tag, or
   * just add the tag by name if it doesnt
   */
  @Output() tagStaged = new EventEmitter<string>();

  readonly separatorKeysCodes: number[] = [ENTER,SPACE];

  constructor() { }

  ngOnInit() {
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    let value = event.value;

    value = (value || '').trim();
    if (!value) return;

    if (input) input.value = '';

    //prevent dupes
    let found = false;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].name.toLowerCase() === value.toLowerCase()) {
        found = true;
        break;
      }
    }
    if (found) return;

    this.tagStaged.emit(value);
  }
}
