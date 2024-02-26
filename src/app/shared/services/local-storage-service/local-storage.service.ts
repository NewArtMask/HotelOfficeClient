import { Injectable } from '@angular/core';
import { UserStatus } from '../../enums/user-status.enum';
import { UserRole } from '../../enums/user-role.enum';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly ACCESS_TOKEN = 'accessToken';
  private readonly REFRESH_TOKEN = 'refreshToken';
  private readonly USER_ID = 'userId';
  private readonly USER_ROLE = 'userRole';
  private readonly USER_STATUS = 'userStatus';
  private readonly USERNAME = 'username';

  constructor(private authService: AuthService) {}

  public setUserId(userId: string): void {
    localStorage.setItem(this.USER_ID, userId);
    this.authService.setUserLoginState(true);
  }

  public getUserId(): string | null {
    return localStorage.getItem(this.USER_ID);
  }

  public setUserName(name: string): void {
    localStorage.setItem(this.USERNAME, name);
  }

  public getUserName(): string | null {
    return localStorage.getItem(this.USERNAME);
  }

  public setUserData(): void {}

  public setAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public setUserStatus(userStatus: UserStatus): void {
    localStorage.setItem(this.USER_STATUS, userStatus);
  }

  public getUserStatus(): string | null {
    return localStorage.getItem(this.USER_STATUS);
  }

  public setUserRole(userRole: UserRole): void {
    localStorage.setItem(this.USER_ROLE, userRole);
    this.authService.setRole(userRole);
  }

  public getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE);
  }

  public clearLocalStorage() {
    localStorage.clear();
    this.authService.setUserLoginState(false);
    this.authService.setRole(UserRole.NONE);
  }
}
