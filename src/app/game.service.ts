import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Game } from './game';
import { Review } from './review';
import { User } from './user';
import { List } from './list';
import { Tag } from './tag';
import { UserService } from './user.service';
import { PublicUser } from './public-user';
import { Screenshot } from './screenshot';
import { Observable ,  of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GameService {
  private gamesUrl = '/api/games';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getGames(query: string, 
    page: number, limit: number,
    sort: string = '', sortdir: string = ''): Observable<Game[]> {
    let p = new HttpParams();
    p = p.append("page", page.toString());
    p = p.append("limit", limit.toString());
    if (sort) p = p.append("order_col", sort);
    if (sortdir) p = p.append("order_dir", sortdir);
    if (query) p = p.append("q", query);
    return this.http.get<Game[]>(this.gamesUrl, {params: p});
  }

  getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.gamesUrl}/${id}`);
  }

  updateGame(game: Game): Observable<any> {
    console.log('not implemented');
    return of(null);
  }

  getReviews(page: number, limit: number): Observable<Review[]> {
    let p = new HttpParams();
    p = p.append("page", page.toString());
    p = p.append("limit", limit.toString());
    return this.http.get<Review[]>(`/api/reviews`,{params: p});
  }

  getReviewsForGame(gameId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`/api/games/${gameId}/reviews`);
  }

  getScreenshotsForGame(gameId: number): Observable<Screenshot[]> {
    return this.http.get<Screenshot[]>(`/api/games/${gameId}/screenshots`);
  }

  getUser(userId: number): Observable<PublicUser> {
    return this.http.get<PublicUser>(`/api/users/${userId}`);
  }

  getReviewsForUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`/api/users/${userId}/reviews`);
  }

  getListsForUserGame(userId: number, gameId: number): Observable<List[]> {
    return this.http.get<List[]>(`/api/users/${userId}/games/${gameId}/lists`);
  }

  updateList(userId: number, gameId: number, 
      listId: number, value: boolean): Observable<List[]> {
    const url = `/api/lists/${listId}`;
    return this.http.post<List[]>(url,{
      userId: userId,
      gameId: gameId,
      value: value
    });
  }

  getTagsForGame(gameId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(`/api/games/${gameId}/tags`);
  }
}