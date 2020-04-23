import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  transform(items: any[], types: string[]): any[] {
    if (!items) return [];
    if (!types || types.length === 0) return items;

    console.log(types);
    return items.filter((it) => {
      return types.includes(it.type);
    });
  }
}
