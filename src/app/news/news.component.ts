import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave',
        animate('600ms ease-in', style({transform: 'translateX(100%)'}))
      )
    ])
  ]
})
export class NewsComponent implements OnInit {

  @Input() news: any;
  @Input() hasPrev: boolean = true;
  
  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
