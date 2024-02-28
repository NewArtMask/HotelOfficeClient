export interface HotelInformation {
  basicInformation: HotelBasicInformation;
  detailedInformation: HotelDetailedInformation;
}

export interface HotelBasicInformation {
  hotelName: string;
  street: string;
  city: string;
  zipCode: number | null;
  phoneNumber: number | null;
  website: string;
}

export interface HotelDetailedInformation {
  description: string;
  roomCount: number | null;
  bedCount: number | null;
  facilities: HotelFacilitie[] | null;
  attractions: HotelAttraction[] | null;
}

export interface HotelFacilitie {
  name: string;
}

export interface HotelAttraction {
  name: string;
}
