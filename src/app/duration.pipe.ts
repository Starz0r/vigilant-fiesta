import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value) {
      return moment(value).fromNow(true);
  }
  return value;
  }

}
