import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {

  }

  transform(value: any, args?: any): any {
    return value!==null && value!==undefined
    ?this.decimalPipe.transform(value,'1.1-1')+' / 100'
    :'N/A'
  }

}
