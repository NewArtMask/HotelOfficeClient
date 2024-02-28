import { Injectable } from '@angular/core';
import { User } from '../../interfaces/userInterfaces';
import { UserRole } from '../../enums/user-role.enum';
import { UserStatus } from '../../enums/user-status.enum';
import { Column } from '../../interfaces/admin.interface';
import { HotelInformation } from '../../interfaces/hotelInterfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly userList: User[] = [
    {
      userId: 'f614a618-df84-46bf-9644-f08242a0b97d',
      name: 'Tony',
      surname: 'Stark',
      email: 'tony.stark@mail.to',
      role: UserRole.ROLE_USER,
      userStatus: UserStatus.ACTIVATED,
      hotelCount: 3,
    },
    {
      userId: '7b3ee88c-9233-4410-ba3f-23fafa6a88a3',
      name: 'Bruce',
      surname: 'Banner',
      email: 'bruce.banner@mail.to',
      role: UserRole.ROLE_USER,
      userStatus: UserStatus.ACTIVATED,
      hotelCount: 0,
    },
    {
      userId: 'c9a7b06d-ca0a-487d-a4da-7e6e79f6af74',
      name: 'Peter',
      surname: 'Parker',
      email: 'peter.parker@mail.to',
      role: UserRole.ROLE_USER,
      userStatus: UserStatus.ACTIVATED,
      hotelCount: 0,
    },
  ];

  colums: Column[] = [
    { field: 'userId', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'surname', header: 'Surname' },
    { field: 'email', header: 'E-Mail' },
    { field: 'role', header: 'Role' },
    { field: 'userStatus', header: 'Status' },
    { field: 'hotelCount', header: `Number of hotels` },
  ];

  constructor() {}

  getAllUsers() {
    return this.userList;
  }

  getUserTableColumns() {
    return this.colums;
  }

  async getHotelsByUserId(userId: string) {
    return (
      this.someUserList.filter((user) => user.userId === userId)[0]?.hotels ??
      []
    );
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

  private someUserList = [
    {
      userId: 'f614a618-df84-46bf-9644-f08242a0b97d',
      name: 'Tony',
      surname: 'Stark',
      email: 'tony.stark@mail.to',
      role: UserRole.ROLE_USER,
      userStatus: UserStatus.ACTIVATED,
      hotels: this.hotelList,
    },
  ];
}
