import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Report } from '../report';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentReport: Report;

  reports: Report[] = [];
  loading: boolean = true;

  answered: boolean = false;

  user: User;

  constructor(
    private userService: UserService,
    private reportService: ReportService,) {
      //TODO: if !user, route to home
      this.userService.userChange.subscribe(user=>this.user=user);
    }

  ngOnInit() {
    this.getReports();
    this.getNextReport();
  }

  resolve(reportId: number) {
    const answererId = this.user.id;
    this.reportService.resolveReport(reportId,answererId).subscribe(report => {
      const rInd = this.reports.findIndex(r => r.id == report.id);
      this.reports[rInd] = report;
    })
  }

  getReports() {
    this.loading = true;
    this.reportService.getReports(this.answered,0,10).subscribe(reports => {
      this.reports = reports;
      this.loading = false;
    });
  }

  getNextReport() {
    this.reportService.getReports(false,0,1).subscribe(reports => {
      if (reports.length==0) {
        this.currentReport = null;
      } else {
        this.currentReport = reports[0];
      }
    });
  }

}
