import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any;
  @Input('app-name') appName: string;
  @Input('logo') logo: string;
  @Input('logo-alt') alt: string;
  @Input('logo-width') width: number | any;
  @Input('logo-height') height: number | any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.width) {
      this.width = 150;
    }

    if (!this.height) {
      this.height = 'auto';
    }
  }

  onLogout = () => {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

}
