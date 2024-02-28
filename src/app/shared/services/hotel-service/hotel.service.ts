import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  HotelBasicInformation,
  HotelDetailedInformation,
  HotelInformation,
} from '../../interfaces/hotelInterfaces';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotelRegistrationComplete = new Subject<HotelInformation>();
  hotelRegistrationComplete$ = this.hotelRegistrationComplete.asObservable();

  private hotelInformation: HotelInformation = {
    basicInformation: {
      hotelName: '',
      street: '',
      city: '',
      zipCode: null,
      phoneNumber: null,
      website: '',
    },
    detailedInformation: {
      description: '',
      roomCount: null,
      bedCount: null,
      facilities: null,
      attractions: null,
    },
  };

  getHotelInformation() {
    return this.hotelInformation;
  }

  setHotelInformation(hotelInformation: HotelInformation) {
    this.hotelInformation = hotelInformation;
  }

  setHotelBasicInformation(hotelBasicInformation: HotelBasicInformation) {
    this.hotelInformation = {
      ...this.hotelInformation,
      basicInformation: hotelBasicInformation,
    };
  }

  setHotelDetailedInformation(
    hotelDetailedInformation: HotelDetailedInformation
  ) {
    this.hotelInformation = {
      ...this.hotelInformation,
      detailedInformation: hotelDetailedInformation,
    };
  }

  complete() {
    this.hotelRegistrationComplete.next(this.hotelInformation);
  }

  getHotelsForUser() {
    return this.hotelList;
  }

  private hotelList: HotelInformation[] = [
    {
      basicInformation: {
        hotelName: 'Hotel 1',
        street: 'Straßegasse 1',
        city: 'Wien',
        zipCode: 1090,
        phoneNumber: 5465465,
        website: '-',
      },
      detailedInformation: {
        description: 'Spa Resort',
        roomCount: 10,
        bedCount: 20,
        facilities: [
          {
            name: 'Spa',
          },
          {
            name: 'Pool',
          },
        ],
        attractions: null,
      },
    },
    {
      basicInformation: {
        hotelName: 'Hotel 2',
        street: 'Straßegasse 2',
        city: 'Wien',
        zipCode: 1090,
        phoneNumber: 5468865,
        website: '-',
      },
      detailedInformation: {
        description: 'Vacation Rental',
        roomCount: 5,
        bedCount: 8,
        facilities: [
          {
            name: 'Wi-Fi',
          },
        ],
        attractions: [
          {
            name: 'Restaurants',
          },
          {
            name: 'Museums',
          },
        ],
      },
    },
    {
      basicInformation: {
        hotelName: 'Hotel 3',
        street: 'Straßegasse 3',
        city: 'Wien',
        zipCode: 1090,
        phoneNumber: 5465441,
        website: '-',
      },
      detailedInformation: {
        description: `Family-frendly hotel`,
        roomCount: 11,
        bedCount: 20,
        facilities: null,
        attractions: null,
      },
    },
  ];
}
