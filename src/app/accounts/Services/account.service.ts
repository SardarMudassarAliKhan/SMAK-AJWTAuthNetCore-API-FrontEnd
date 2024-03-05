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
    // Start the token refresh timer when AccountService is initialized
    this.startTokenRefreshTimer();
  }

  // Method to perform user login
  login(model: any) : Observable<AuthenticatedResponse> {
    // Make a POST request to the login API endpoint and return an Observable of type AuthenticatedResponse
    return this.httpclient.post<AuthenticatedResponse>(this.baseUrl + 'api/Auth/Login', model);
  }

  // Method to perform user logout
  logout = () => {
    // Remove token and refresh token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  // Method to refresh the access token
  refreshToken(): Observable<any> {
    return this.httpclient.post<any>(this.baseUrl+'api/Token/refresh', {}).pipe(
      tap((response: any) => {
        // Update tokens in local storage if response contains access token
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      })
    );
  }

  // Method to get refresh token from local storage
  private getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  // Method to set session after successful login
  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('refreshToken', authResult.refreshToken);
  }

  // Method to get access token from local storage
  getAccessToken(): any {
    return localStorage.getItem('token');
  }

  // Method to check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    return !!token && !!refreshToken;
  }

  // Method to start timer for token refresh
  private startTokenRefreshTimer() {
    // 30 minutes in milliseconds
    const refreshTokenInterval = 30 * 60 * 1000;
    // Use RxJS interval to create a timer that triggers token refresh
    interval(refreshTokenInterval).pipe(
      // Start immediately and then at the specified interval in milliseconds
      startWith(0),
      // Switch to refreshToken observable after interval elapses
      switchMap(() => this.refreshToken())
    ).subscribe(() => {
      console.log('Token refreshed successfully.');
    }, (error) => {
      console.error('Error refreshing token:', error);
    });
  }
}
