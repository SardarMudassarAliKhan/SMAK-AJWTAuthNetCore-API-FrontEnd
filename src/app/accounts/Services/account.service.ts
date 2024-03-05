import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticatedResponse } from '../../core/Models/AuthenticatedResponse';
import { Observable, interval, startWith, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl;
  constructor(
    private httpclient: HttpClient
    ) {
      this.startTokenRefreshTimer();
     }

  login(model: any) : Observable<AuthenticatedResponse> {
    debugger;
    return this.httpclient.post<AuthenticatedResponse>(this.baseUrl + 'api/Auth/Login', model);
  }

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  refreshToken(): Observable<any> {
    return this.httpclient.post<any>(this.baseUrl+'api/Token/refresh', {}).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      })
    );
  }

  private getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('refreshToken', authResult.refreshToken);
  }

  getAccessToken(): any {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    return token && refreshToken ? true : false;
  }

  private startTokenRefreshTimer() {
    // 30 minutes in milliseconds
    const refreshTokenInterval = 30 * 60 * 1000;
    // Use RxJS interval to create a timer that triggers token refresh
    interval(refreshTokenInterval).pipe(
      // Start immediately and then at the specified interval in milliseconds
      startWith(0),
      switchMap(() => this.refreshToken())
    ).subscribe(() => {
      console.log('Token refreshed successfully.');
    }, (error) => {
      console.error('Error refreshing token:', error);
    });
  }
}
