import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '../model/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  typeMap: {[id:string]:string;} = {
    "review":"Review Reported",
    "game":"Game Reported",
    "game_add":"Game Added",
    "game_remove":"Game Removed",
    "screenshot_remove":"Screenshot Removed",
    "user_register":"User Registered",
    "user":"User Reported",
    "user_password_change":"User Password Changed",
    "game_update_url":"Game URL Updated",
    "review_restore":"Review Restored",
    "screenshot":"Screenshot Added",
    "game_update_owner":"Game Owner Updated",
    "game_update_creator":"Game Creator Updated",
  };

  @Input() report: Report;
  
  @Output() onResolve = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  resolve() {
    this.onResolve.emit(this.report.id);
  }
}
