import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '../report';
import { UserService } from '../user.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() report: Report;
  
  @Output() onResolve = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  resolve() {
    this.onResolve.emit(this.report.id);
  }
}
