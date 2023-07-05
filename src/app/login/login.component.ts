import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserAuthService} from "../services/auth.service";
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {Router} from "@angular/router";
import {OrderItemToAdd} from "../model/orderItemToAdd.model";

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
        (response:any) => {
          if(response.hasOwnProperty("statusCode")) {
            alert(response.message);
          } else {
            this.authService.setToken(response.token);
            let tokenInfo = jwt_decode<JwtPayload>(response.token); //token is your JWT token received from server.
            this.authService.setPermissions((tokenInfo as any).permissions[0].authority);
            this.authService.setUsername(tokenInfo.sub as string);
            let cart:OrderItemToAdd[] = [];
            this.authService.setCart(cart);
            this.router.navigate(["/"]);
          }

        },
        error => {
          console.log(error);
        }
      );
  }

}
