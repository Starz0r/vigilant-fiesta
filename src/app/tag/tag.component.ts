import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../model/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() name: string;
  @Input() id: number;
  @Input() count: number;

  constructor() { }

  ngOnInit() {
  }

}
