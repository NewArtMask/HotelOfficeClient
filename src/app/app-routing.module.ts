import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/main/main.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { LoginComponent } from './shared/login/login.component';
import { authGuard } from './shared/guards/auth-guard/auth.guard';
import { userLoadGuard } from './shared/guards/user-load-guard/user-load.guard';
import { adminLoadGuard } from './shared/guards/admin-load-guard/admin-load.guard';
import { homeGuard } from './shared/guards/home.guard';

const routes: Routes = [
  {
    path: 'home',
    component: MainComponent,
    canActivate: [homeGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
    canMatch: [userLoadGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    canMatch: [adminLoadGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
