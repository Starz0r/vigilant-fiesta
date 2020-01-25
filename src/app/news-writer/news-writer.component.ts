import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import marked from 'marked';

@Component({
  selector: 'app-news-writer',
  templateUrl: './news-writer.component.html',
  styleUrls: ['./news-writer.component.scss']
})
export class NewsWriterComponent implements OnInit {

  @Output() submitNews = new EventEmitter<any>();

  input: string;
  compiled: string;

  news: any = {};

  constructor() { }

  ngOnInit() {
  }

  recompile() {
    this.compiled = marked.parser(marked.lexer(this.input));
    this.news.short = this.compiled;
    this.news.news = this.compiled; //TOOD: long form?
  }

}
