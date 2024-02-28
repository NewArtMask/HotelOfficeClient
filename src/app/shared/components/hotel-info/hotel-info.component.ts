import { Component, Input } from '@angular/core';
import {
  HotelAttraction,
  HotelFacilitie,
  HotelInformation,
} from 'src/app/shared/interfaces/hotelInterfaces';
import { HoteInfoFilerPipe } from '../../pipes/hote-info-filer-pipe/hote-info-filer.pipe';

@Component({
  selector: 'app-hotel-info',
  standalone: true,
  imports: [HoteInfoFilerPipe],
  templateUrl: './hotel-info.component.html',
  styleUrl: './hotel-info.component.scss',
})
export class HotelInfoComponent {
  @Input('info') hotelInformation!: HotelInformation;

  getFacilities(): HotelFacilitie[] | null {
    return this.hotelInformation.detailedInformation?.facilities;
  }

  getAttractions(): HotelAttraction[] | null {
    return this.hotelInformation.detailedInformation?.attractions;
  }
}
