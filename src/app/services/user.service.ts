import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginData} from "../model/loginData.model";
import {tap} from "rxjs";
import {RegisterData} from "../model/registerData.model";

@Injectable({providedIn: "root"})
export class UserService {

  requestHeader: HttpHeaders = new HttpHeaders({"No-Auth": 'True'});
  constructor(private http: HttpClient) { }

  login(loginData: LoginData) {
    return this.http.post<{token: string}>('http://localhost:8080/login', loginData).pipe(
      tap(({token}) => localStorage.setItem('auth_token', token))
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  public loggedIn(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }

  public register(registerData: RegisterData) {
    return this.http.post("http://localhost:8080/signup", registerData);
  }
}
