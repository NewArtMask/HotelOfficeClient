import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage-service/local-storage.service';

export const homeGuard: CanActivateFn = (route, state) => {
  if (!inject(LocalStorageService).getUserId()) {
    inject(Router).navigate(['login']);
  }

  return true;
};
