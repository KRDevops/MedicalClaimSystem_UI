import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/services/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User;
  loginForm: FormGroup;
  submitted: boolean;
  subscription: Subscription;
  loginError: boolean;
  loginErrorMessage: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.submitted = false;
    this.loginError = false;
    /**
     * Redirection if user logged in
     */
    if (this.userService.isUserLoggedIn.value) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * getter for access form fields easily
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Login with crediantials
   * @param emailId string
   * @param password string
   */
  onLogin = () => {
    this.submitted = true;
    this.loginError = false;
    if (!this.loginForm.valid) {
      return;
    }

    this.subscription = this.userService.login(this.loginForm.value).subscribe(res => {
      let r: any = res;
      this.userService.setUser = { userId: r.userId };
      this.userService.isUserLoggedIn.next(this.userService.getUser);
      this.router.navigate(['/dashboard']);
    }, err => {
      this.loginError = true;
      this.loginErrorMessage = err.error.message;
    });
  }

  /**
   * destroy subcription of login/logout watcher
   */
  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}
