import { Injectable } from '@angular/core';
import {
  LoginDto,
  LoginResponseDto,
  RegistrationResponseDto,
  UserDto,
} from '../../interfaces/userInterfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegistrationServiceService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public registerUser(userDto: UserDto): Observable<RegistrationResponseDto> {
    console.log(userDto);
    return this.http.post<RegistrationResponseDto>(
      `${environment.backendLink}/registration`,
      userDto
    );
  }

  public login(loginDto: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      `${environment.backendLink}/login`,
      loginDto
    );
  }

  public saveLoginData(userData: LoginResponseDto): void {
    this.localStorageService.setAccessToken(userData.token);
    this.localStorageService.setUserName(userData.name);
    this.localStorageService.setUserId(userData.userId);
    this.localStorageService.setUserRole(userData.role);
    this.localStorageService.setUserStatus(userData.userStatus);
  }

  public logOut(): void {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['login']);
  }
}
