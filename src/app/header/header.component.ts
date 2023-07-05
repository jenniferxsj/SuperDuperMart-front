import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(private userAuthService: UserAuthService, private router: Router) {
  }

  ngOnInit() {
    this.isAdmin = this.userAuthService.isAdmin();
  }

  public isLogIn() {
    return this.userAuthService.isLogin();
  }

  public logout():void {
    this.userAuthService.clearToken();
    this.router.navigate(["/login"]);
  }

}
