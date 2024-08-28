import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtefilter'
})
export class FiltefilterPipe implements PipeTransform {

  transform(items: string[], extension: string): string[] {
    return items.filter(item => item.endsWith(extension));
  }

}

