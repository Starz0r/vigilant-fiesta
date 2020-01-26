import { Injectable } from '@angular/core';
import { GameSearchParams } from './game-search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

  stateParams: GameSearchParams = {
    page: 0,
    limit: 25,
  };

  constructor() { }

  setState(p: GameSearchParams) {
    this.stateParams = p;
  }

  getState(): GameSearchParams {
    return this.stateParams;
  }
}
