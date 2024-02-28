import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HotelInformation } from 'src/app/shared/interfaces/hotelInterfaces';
import { AdminService } from 'src/app/shared/services/admin-service/admin.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
})
export class HotelListComponent implements OnInit {
  private userId!: string;
  hotels!: HotelInformation[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getUserHotels(this.userId);
    });
  }

  getUserHotels(userId: string) {
    this.adminService.getHotelsByUserId(userId).then((hotels) => {
      this.hotels = hotels;
    });
  }
}
