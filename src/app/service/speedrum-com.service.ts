import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export class SRCategory {
  id: string
  name: string
  weblink: string
  type: string
  rules: string
  players: any
  miscellaneous: boolean
  links: any[];
}

export class SRLeaderboardRun {
  place: number;
  run: SRRun;
}

export class SRRun {
  id: string;
  weblink: string;
  game: string;
  level: any;
  category: string;
  videos: SRVideos;
  comment: string;
  status: SRStatus;
  players: SRPlayer[];
  date: string;
  submitted: string;
  times: any;
  system: any;
  splits: any;
  values: any
}

export class SRVideos {
  links: SRLink[];
}

export class SRLink {
  uri: string;
  rel: string;
}

export class SRStatus {
  status: string;
  examiner: string;
  'verify-date': string;
}

export class SRPlayer {
  rel: string;
  id: string;
  uri: string;
}

export class SRNames {
  international: string;
  japanese: string;
}

export class SRNameStyle {
  style: string;
  "color-from": SRGradient;
  "color-to": SRGradient;
}

export class SRGradient {
  light:string;
  dark: string;
}

export class SRLocation {
  country: SRCountry;
}

export class SRCountry {
  code: string;
  names: SRNames;
}

export class SRUser {
  id: string;
  names: SRNames;
  weblink: string;
  "name-style": SRNameStyle;
  role: string;
  signup: string;
  location: SRCountry;
  twitch: SRLink;
  hitbox: SRLink;
  youtube: SRLink;
  twitter: SRLink;
  speedrunslive: SRLink;
  links: SRLink[];
}

@Injectable({
  providedIn: 'root'
})
export class SpeedrumComService {

  players = new Map<string,SRUser>();

  constructor(
    private http: HttpClient) { }

    getCategories(url: string): Observable<SRCategory[]> {
      const id = this.getId(url);
      return this.http.get<any>(`https://www.speedrun.com/api/v1/games/${id}/categories`)
        .pipe(map(res => res.data || null));
    }

    getLeaderboard(url: string, categoryId: string): Observable<SRLeaderboardRun[]> {
      const id = this.getId(url);
      return this.http.get<any>(`https://www.speedrun.com/api/v1/leaderboards/${id}/category/${categoryId}`)
        .pipe(map(res => res.data.runs || null));
    }

    getPlayer(player: SRPlayer): Observable<SRUser> {
      if (!player || !player.id || !player.uri) return of(null);
      if (this.players[player.id]) return of(this.players[player.id]);
      return this.http.get<any>(player.uri).pipe(
        map(res => res.data),
        tap(user => this.players[player.id]=user)
      );
    }

    private getId(url: string): string {
      const urlPattern = /^.*speedrun\.com\/(.*)$/i

      let id = url;
      /*let result = urlPattern.exec(url);
      if (result) {
        id = result.groups[1];
      }*/

      return id;
    }
}
