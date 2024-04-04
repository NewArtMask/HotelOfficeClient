import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';

import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelInfoComponent } from '../shared/components/hotel-info/hotel-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProfileFormComponent } from '../shared/components/profile-form/profile-form.component';

const routerConfig = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'adminprofile',
    component: AdminProfileComponent,
  },
  {
    path: 'adminuserlist',
    component: UserListComponent,
  },
  {
    path: 'adminhotellist/:id',
    component: HotelListComponent,
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminProfileComponent,
    UserListComponent,
    HotelListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routerConfig),
    TableModule,
    AccordionModule,
    HotelInfoComponent,
    ProfileFormComponent,
    ReactiveFormsModule,
    MessagesModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class AdminModule {}
