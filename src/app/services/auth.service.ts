import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: "root"
})
export class UserAuthService{

  constructor() {
  }
  public setPermissions(permissions: string) {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  public getPermissions(): string | null {
    const item: string | null = localStorage.getItem("permissions");
    return item ? JSON.parse(item) : null;
  }

  public setToken(jwtToken: string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }

  public setUsername(username:string) {
    return localStorage.setItem('username', username);
  }

  public getUsername(): string | null {
    return localStorage.getItem("username");
  }

  public clearToken() {
    localStorage.clear();
  }

  public isLogin() {
    return this.getPermissions() && this.getToken();
  }
}
