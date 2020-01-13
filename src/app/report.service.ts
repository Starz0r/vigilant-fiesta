import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './report';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private gamesUrl = '/api/reports';

  constructor(
    private http: HttpClient,) { }

    getReports(answered: boolean,
      page: number, limit: number,
      sort: string = '', sortdir: string = ''): Observable<Report[]> {
        let p = new HttpParams();
        p = p.append("page", page.toString());
        p = p.append("limit", limit.toString());
        if (sort) p = p.append("order_col", sort);
        if (sortdir) p = p.append("order_dir", sortdir);
        if (answered !== undefined && answered !== null) {
          p = p.append("answered",answered?"1":"0");
        }
        return this.http.get<Report[]>(this.gamesUrl, {params: p});
    }

    resolveReport(reportId: number, answerer: number): Observable<Report> {
      return this.http.patch<Report>(`${this.gamesUrl}/${reportId}`, {
        id: reportId,
        dateAnswered: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        answeredById: answerer
      });
    }
}
