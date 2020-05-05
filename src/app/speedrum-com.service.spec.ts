import { TestBed } from '@angular/core/testing';

import { SpeedrumComService } from './speedrum-com.service';

describe('SpeedrumComServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeedrumComService = TestBed.get(SpeedrumComService);
    expect(service).toBeTruthy();
  });
});
