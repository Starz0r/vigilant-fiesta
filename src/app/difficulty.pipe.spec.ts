import { DifficultyPipe } from './difficulty.pipe';
import { DecimalPipe } from '@angular/common';

describe('DifficultyPipe', () => {
  it('create an instance', () => {
    const pipe = new DifficultyPipe(new DecimalPipe('en-US'));
    expect(pipe).toBeTruthy();
  });
});
