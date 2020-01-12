import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() report: Report;

  constructor() { }

  ngOnInit() {
  }

}
