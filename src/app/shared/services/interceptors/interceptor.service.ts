import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.localStorageService.getAccessToken();
    if (accessToken) {
      req = this.addAccessTokenToHeader(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 401) {
          this.localStorageService.clearLocalStorage();
          this.router.navigate(['login']);
        }

        return throwError(() => error);
      })
    );
  }

  private addAccessTokenToHeader(
    req: HttpRequest<any>,
    accessToken: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
