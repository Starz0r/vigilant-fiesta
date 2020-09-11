import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {

  }

  transform(value: any, args?: any): any {
    if (value==null || value==undefined || value==-1) return "N/A";
    return this.decimalPipe.transform(value,'1.1-1')+' / 100'
  }

}
