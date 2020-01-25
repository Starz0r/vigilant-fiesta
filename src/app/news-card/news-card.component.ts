import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input() news: any = {};
  @Input() hasPrev: boolean = true;
  
  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
