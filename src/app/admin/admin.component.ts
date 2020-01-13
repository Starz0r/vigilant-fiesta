import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Report } from '../report';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  reports: Report[] = [];
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private reportService: ReportService,) { }

  ngOnInit() {
    this.loading = true;
    this.reportService.getReports(false,0,10).subscribe(reports => {
      this.reports = reports;
      this.loading = false;
    });
  }

  resolve(reportId: number) {
    const answererId = this.userService.getUser().id;
    this.reportService.resolveReport(reportId,answererId).subscribe(report => {
      console.log(report.id);
    })
  }

}
