import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AccountService } from '../Services/account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/refresh-token')) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getAccessToken()}`
          }
        });
        return next.handle(request);
      }),
      catchError((error: any) => {
        // Handle refresh token error
        this.authService.logout();
        return throwError(error);
      })
    );
  }
}
