import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';

const routerConfig = [
  {
    path: '',
    component: AdminComponent,
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routerConfig)],
})
export class AdminModule {}
