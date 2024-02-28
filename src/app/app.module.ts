import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { MainComponent } from './shared/main/main.component';
import { RegistrationComponent } from './shared/registration/registration.component';

import { MessageService } from 'primeng/api';
import { HotelService } from './shared/services/hotel-service/hotel.service';
import { InterceptorService } from './shared/services/interceptors/interceptor.service';
import { LocalStorageService } from './shared/services/local-storage-service/local-storage.service';
import { RegistrationServiceService } from './shared/services/registration-service/registration-service.service';
import { AdminService } from './shared/services/admin-service/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    UserModule,
    MenubarModule,
    PanelModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
    CardModule,
    ToastModule,
    MessagesModule,
  ],
  providers: [
    RegistrationServiceService,
    HotelService,
    MessageService,
    LocalStorageService,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
