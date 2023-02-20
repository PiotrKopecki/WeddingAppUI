import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/_model/user/user-dto';
import { RoutingService } from 'src/app/_service/routing.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public static isLoggedIn = 'isLoggedIn';
  ifUserNotExist: boolean = false;

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]],
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private routingService: RoutingService
    ) {}

  onSubmit() {
    this.userService.getUserByLoginAndPass(this.loginForm.value.login!, this.loginForm.value.password!).subscribe(
      (result) => {
        if(result == null) {
          this.ifUserNotExist = true;
        }
        else {
          this.ifUserNotExist = false;
          localStorage.setItem(LoginComponent.isLoggedIn, 'user');
          this.routingService.openHomePage();
        }
      }
    );
  }

  signInAsGuest() {
    localStorage.setItem(LoginComponent.isLoggedIn, 'guest');
    this.routingService.openHomePage();
  }
}
