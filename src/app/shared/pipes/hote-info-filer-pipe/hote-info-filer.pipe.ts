import { Pipe, PipeTransform } from '@angular/core';
import {
  HotelAttraction,
  HotelFacilitie,
} from '../../interfaces/hotelInterfaces';

@Pipe({
  name: 'fromListToString',
  standalone: true,
})
export class HoteInfoFilerPipe implements PipeTransform {
  transform(
    value: HotelFacilitie[] | HotelAttraction[] | null,
    ...args: unknown[]
  ): string {
    return (
      value?.reduce(
        (acc, item, index) => (index ? acc + ', ' + item.name : item.name),
        ''
      ) ?? ''
    );
  }
}
