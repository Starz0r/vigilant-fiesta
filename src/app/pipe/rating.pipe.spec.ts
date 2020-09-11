import { RatingPipe } from './rating.pipe';
import { DecimalPipe } from '@angular/common';

describe('RatingPipe', () => {
  it('create an instance', () => {
    const pipe = new RatingPipe(new DecimalPipe('en-US'));
    expect(pipe).toBeTruthy();
  });
});
