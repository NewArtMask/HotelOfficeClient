import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserRole } from '../../enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role = new Subject<UserRole>();
  currentUserRole = this.role.asObservable();

  private isLogin = new Subject<boolean>();
  isUserLogined = this.isLogin.asObservable();

  setRole(role: UserRole): void {
    this.role.next(role);
  }

  setUserLoginState(isLogined: boolean) {
    this.isLogin.next(isLogined);
  }
}
