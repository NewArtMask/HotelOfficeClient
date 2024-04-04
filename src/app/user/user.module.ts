import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoteInfoFilerPipe } from '../shared/pipes/hote-info-filer-pipe/hote-info-filer.pipe';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { BasicInformationComponent } from './hotel/basic-information/basic-information.component';
import { ConfirmationComponent } from './hotel/confirmation/confirmation.component';
import { DetailedInformationComponent } from './hotel/detailed-information/detailed-information.component';
import { HotelComponent } from './hotel/hotel.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HotelInfoComponent } from '../shared/components/hotel-info/hotel-info.component';
import { ProfileFormComponent } from '../shared/components/profile-form/profile-form.component';

const routerConfig: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'hotel',
    component: HotelComponent,
    children: [
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
      { path: 'basic', component: BasicInformationComponent },
      { path: 'detailed', component: DetailedInformationComponent },
      { path: 'confirmation', component: ConfirmationComponent },
    ],
  },
  {
    path: 'hotellist',
    component: HotelListComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [
    UserComponent,
    HotelComponent,
    BasicInformationComponent,
    DetailedInformationComponent,
    ConfirmationComponent,
    HotelListComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routerConfig),
    StepsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    MultiSelectModule,
    AccordionModule,
    DynamicDialogModule,
    MessagesModule,
    HoteInfoFilerPipe,
    HotelInfoComponent,
    ProfileFormComponent,
  ],
  providers: [DialogService],
})
export class UserModule {}
