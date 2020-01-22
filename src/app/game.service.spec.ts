import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
      imports: [
        HttpClientTestingModule]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
