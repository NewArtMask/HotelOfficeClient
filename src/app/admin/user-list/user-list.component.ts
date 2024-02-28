import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Column } from 'src/app/shared/interfaces/admin.interface';
import { User } from 'src/app/shared/interfaces/userInterfaces';
import { AdminService } from 'src/app/shared/services/admin-service/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users!: User[];
  cols!: Column[];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.adminService.getAllUsers();
    this.cols = this.adminService.getUserTableColumns();
  }

  getUserHotels(userId: string): void {
    console.log(userId);

    this.router.navigate(['admin', 'adminhotellist', `${userId}`]);
  }
}
