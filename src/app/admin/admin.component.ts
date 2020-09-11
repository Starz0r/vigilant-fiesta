import { Component, OnInit } from '@angular/core';
import { ReportService } from '../service/report.service';
import { Report } from '../model/report';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Screenshot } from '../model/screenshot';
import { GameService } from '../service/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  reportIndex = 0;

  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private gameService: GameService,
    private snackBar: MatSnackBar) {
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
      this.getNextReport();
    })
  }

  getReports() {
    this.loading = true;
    this.reportService.getReports(this.answered,0,10).subscribe(reports => {
      this.reports = reports;
      this.loading = false;
    });
  }

  prevReport() {
    this.reportIndex--;
    this.getNextReport();
  }

  nextReport() {
    this.reportIndex++;
    this.getNextReport();
  }

  getNextReport() {
    this.reportService.getReports(false,this.reportIndex,this.reportIndex+1).subscribe(reports => {
      if (reports.length==0) {
        this.currentReport = null;
      } else {
        this.currentReport = reports[0];
      }
    });
  }

  screenshotUrl(id: string): string {
    const screenshot = new Screenshot();
    screenshot.id = +id;
    return screenshot.getUrl();
  }

  submitNews(news: any) {
    this.gameService.addNews(news).subscribe(n => {
      this.snackBar.open("News Submitted!",null,{
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    });
  }
}
