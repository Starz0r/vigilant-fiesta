import { TestBed } from '@angular/core/testing';

import { SpeedrumComService } from './speedrum-com.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SpeedrumComServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeedrumComService],
      imports:[
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', () => {
    const service: SpeedrumComService = TestBed.get(SpeedrumComService);
    expect(service).toBeTruthy();
  });
});
