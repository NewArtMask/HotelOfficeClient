import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/shared/services/hotel-service/hotel.service';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrl: './detailed-information.component.scss',
})
export class DetailedInformationComponent implements OnInit {
  constructor(private hotelService: HotelService, private router: Router) {}

  description!: any[];
  facilities!: any[];
  attractions!: any[];
  detailedInformation: any;
  submitted: boolean = false;

  ngOnInit(): void {
    this.detailedInformation =
      this.hotelService.getHotelInformation().detailedInformation;

    this.facilities = [
      { name: 'Pool' },
      { name: 'Gym' },
      { name: 'Spa' },
      { name: 'Restaurant' },
      { name: 'Room service' },
      { name: 'Wi-Fi' },
      { name: 'Parking' },
      { name: 'Conference rooms' },
      { name: 'Laundry service' },
      { name: 'Other' },
    ];

    this.attractions = [
      { name: 'Beach' },
      { name: 'Mountains' },
      { name: 'Shopping centers' },
      { name: 'Historical sites' },
      { name: 'Parks' },
      { name: 'Restaurants' },
      { name: 'Museums' },
      { name: 'Entertainment venues' },
      { name: 'Transportation hubs' },
      { name: 'Other' },
    ];
  }

  nextPage(): void {
    if (
      this.detailedInformation.roomCount &&
      this.detailedInformation.bedCount
    ) {
      this.hotelService.setHotelDetailedInformation(this.detailedInformation);
      this.router.navigate(['user', 'hotel', 'confirmation']);

      return;
    }

    this.submitted = true;
  }

  prevPage(): void {
    this.router.navigate(['user', 'hotel', 'basic']);
  }
}
