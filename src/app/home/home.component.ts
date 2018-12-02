import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {Router} from '@angular/router';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: Array<User>;
  router: Router;
  globalService: GlobalService;

  constructor(router: Router, globalService: GlobalService) {
    this.router = router;
    this.globalService = globalService;
  }

  ngOnInit() {
    this.users = this.globalService.getAllUsers();
  }

  setUser(user: User) {
    console.log(user);
    this.globalService.setCurrentUser(user);
    this.router.navigateByUrl('/dashboard');
  }

  onUserLogin(userFirstLast: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (userFirstLast === (this.users[i].firstname + ' ' + this.users[i].lastname)) {
        this.setUser(this.users[i]);
        break;
      }
    }
  }

  onAdminLogin() {
    this.router.navigateByUrl('/admin');
  }
}
