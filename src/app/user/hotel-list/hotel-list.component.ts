import { Component, OnInit } from '@angular/core';
import { HotelInformation } from 'src/app/shared/interfaces/hotelInterfaces';
import { HotelService } from 'src/app/shared/services/hotel-service/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
})
export class HotelListComponent implements OnInit {
  hotelList: HotelInformation[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelList = this.getHotels();
  }

  getHotels(): HotelInformation[] {
    return this.hotelService.getHotelsForUser();
  }
}
