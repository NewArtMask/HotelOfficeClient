import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { UserRole } from '../../enums/user-role.enum';

export const userLoadGuard: CanMatchFn = (route, segments) => {
  if (inject(LocalStorageService).getUserRole() !== UserRole.ROLE_USER) {
    inject(Router).navigate(['home']);
    return false;
  }
  return true;
};
