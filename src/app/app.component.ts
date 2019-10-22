import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;
  currentUrl: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.watchUser.subscribe(res => {
      this.loggedIn = res;
    });
  }
}