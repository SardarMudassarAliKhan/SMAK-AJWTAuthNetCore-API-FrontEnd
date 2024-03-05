import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticatedResponse } from '../../core/Models/AuthenticatedResponse';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl;
  constructor(
    private httpclient: HttpClient) { }

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
          localStorage.setItem('accessToken', response.accessToken);
        }
      })
    );
  }

  private getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  private setSession(authResult: any) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('refresh_token', authResult.refreshToken);
  }

  getAccessToken(): any {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token ? true : false;
  }
}
