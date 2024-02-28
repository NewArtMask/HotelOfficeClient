import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { HotelService } from 'src/app/shared/services/hotel-service/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss',
})
export class HotelComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  subscription!: Subscription;

  constructor(
    public messageService: MessageService,
    public hotelService: HotelService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Basic Information',
        routerLink: 'basic',
      },
      {
        label: 'Detailed Information',
        routerLink: 'detailed',
        disabled: true,
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
        disabled: true,
      },
    ];

    this.subscription = this.hotelService.hotelRegistrationComplete$.subscribe(
      (hotelInformation) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Order submitted',
          detail:
            'Hotel ' +
            hotelInformation.basicInformation.hotelName +
            ' information has been sent to the administrator',
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
