import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotsDate'
})
export class BirthDatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    let date = value.split('-');
    if(date.length === 3) {
      return `${date[2]}.${date[1]}.${date[0]}`;
    } else {
      return value;
    }
  }

}
