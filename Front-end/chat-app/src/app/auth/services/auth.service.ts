import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenKey = 'authToken';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }


  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(details:any){
    return this.http.post(`${this.apiUrl}/auth/register`, details);
  }
  
  getAll(){
    return this.http.get(`${this.apiUrl}/auth/getAll`);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
  
    return !!this.getToken();
  }
}
