import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multifilter',
  pure: false, // pipe is recalculated every time data changes on the page
})
export class MultiFilterPipe implements PipeTransform {
  transform(value: any[], filterStrings: any[], propName: any): any {
    if (value.length === 0 || !filterStrings || filterStrings.length === 0) {
      return undefined;
    }

    const resultArray = [];
    for (const item of value) {
      if (filterStrings.indexOf(item[propName]) >= 0) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
