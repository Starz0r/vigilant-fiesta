import { Component, OnInit } from '@angular/core';
import { GameService }  from '../game.service';
import { GameSearchParams } from '../game-search-params';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  constructor(private gameService: GameService) { }

  news: any[] = [];
  curNews: any;
  newsIndex = 0; 

  gameListParams: GameSearchParams = {
    page: 0,
    limit: 25,
    orderCol: "date_created",
    orderDir: "DESC"
  }

  ngOnInit() {
    this.gameService.getNews().subscribe(news => {
      this.news = news;
      if (news.length > 0) this.curNews = news[0];
      this.newsIndex = 0;
    })
  }

  next() {
    if (this.newsIndex < this.news.length-1) {
      this.newsIndex++;
      this.curNews = this.news[this.newsIndex];
    }
  }

  prev() {
    if (this.newsIndex > 0) {
      this.newsIndex--;
      this.curNews = this.news[this.newsIndex];
    }
  }
}