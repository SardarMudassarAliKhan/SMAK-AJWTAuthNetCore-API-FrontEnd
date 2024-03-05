import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticatedResponse } from '../../core/Models/AuthenticatedResponse';
import { Observable } from 'rxjs';
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

  logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token ? true : false;
  }
}
