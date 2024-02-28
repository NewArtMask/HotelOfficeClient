import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  HotelAttraction,
  HotelFacilitie,
  HotelInformation,
} from 'src/app/shared/interfaces/hotelInterfaces';
import { HotelService } from 'src/app/shared/services/hotel-service/hotel.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  hotelInformation!: HotelInformation;

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.hotelInformation = this.hotelService.getHotelInformation();
  }

  getFacilities(): HotelFacilitie[] | null {
    return this.hotelInformation.detailedInformation?.facilities;
  }

  getAttractions(): HotelAttraction[] | null {
    return this.hotelInformation.detailedInformation?.attractions;
  }

  complete(): void {
    this.hotelService.complete();
  }

  prevPage(): void {
    this.router.navigate(['user', 'hotel', 'detailed']);
  }
}
