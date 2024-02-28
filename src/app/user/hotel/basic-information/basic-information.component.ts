import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/shared/services/hotel-service/hotel.service';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrl: './basic-information.component.scss',
})
export class BasicInformationComponent implements OnInit {
  hotelInformation: any;

  submitted: boolean = false;

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.hotelInformation =
      this.hotelService.getHotelInformation().basicInformation;
  }

  nextPage(): void {
    if (
      this.hotelInformation.hotelName &&
      this.hotelInformation.street &&
      this.hotelInformation.city &&
      this.hotelInformation.zipCode &&
      this.hotelInformation.phoneNumber
    ) {
      this.hotelService.setHotelBasicInformation(this.hotelInformation);
      this.router.navigate(['user', 'hotel', 'detailed']);

      return;
    }

    this.submitted = true;
  }
}
