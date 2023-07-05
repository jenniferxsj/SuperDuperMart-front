import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserAuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService : UserService, private authService: UserAuthService, private router: Router) {
  }
  ngOnInit() {}

  registerUser(signupForm: NgForm) {
    console.log(signupForm.value);
    this.userService.register(signupForm.value).subscribe(
      (res:any) => {
        if(res.hasOwnProperty("statusCode")) {
          alert(res.message);
        } else {
          this.router.navigate(["/login"]);
        }

      },
      error => {console.log(error);}
    );
  }

}
