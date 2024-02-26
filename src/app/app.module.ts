import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header/header.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { MainComponent } from './shared/main/main.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { LoginComponent } from './shared/login/login.component';

import { RegistrationServiceService } from './shared/services/registration-service/registration-service.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from './shared/services/local-storage-service/local-storage.service';
import { InterceptorService } from './shared/services/interceptors/interceptor.service';

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
    MessageService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
