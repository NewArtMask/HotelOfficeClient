import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';

const routerConfig = [
  {
    path: '',
    component: UserComponent,
  },
];

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule.forChild(routerConfig)],
})
export class UserModule {}
