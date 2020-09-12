import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import BBCodeParser from 'bbcode-parser';

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

  parser = new BBCodeParser(BBCodeParser.defaultTags());
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  get newsText() {
    if (!this.news) return '';
    if (!this.news.short) return '';
    return this.sanitizer.bypassSecurityTrustHtml(
      this.parser.parseString(this.news.short));
  }

}
