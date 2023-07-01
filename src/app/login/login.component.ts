import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserAuthService} from "../services/auth.service";
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userService : UserService, private authService: UserAuthService, private router: Router) {
  }

  ngOnInit() {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value)
      .subscribe(
        response => {
          this.authService.setToken(response.token);
          let tokenInfo = jwt_decode<JwtPayload>(response.token); //token is your JWT token received from server.
          this.authService.setPermissions((tokenInfo as any).permissions[0].authority);
          this.authService.setUsername(tokenInfo.sub as string);
          this.router.navigate(["/home"]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
