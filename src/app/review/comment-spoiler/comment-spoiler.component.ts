import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-spoiler',
  templateUrl: './comment-spoiler.component.html',
  styleUrls: ['./comment-spoiler.component.scss']
})
export class CommentSpoilerComponent implements OnInit {
  type: string;
  shown: boolean = false;
  @Input() comment: any;
  constructor() { }

  ngOnInit() {
    if (!this.comment) return;
    if (this.comment.type!=='spoiler') {
      this.shown=true;
    }
  }

  toggle() {
    if (!this.comment) return;
    if (this.comment.type==='spoiler') this.shown=!this.shown;
  }

}
