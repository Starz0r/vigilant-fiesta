import { Pipe, PipeTransform, } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {

  }

  transform(value: any, args?: any): any {
    if (value==null || value==undefined || value==-1) return "N/A";
    return this.decimalPipe.transform(value/10,'1.1-1')+' / 10'
  }

}
