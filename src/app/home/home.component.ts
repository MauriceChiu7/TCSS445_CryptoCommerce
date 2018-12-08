import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {Router} from '@angular/router';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  users: Array<User>; // array of users
  router: Router; // router to navigate between pages
  globalService: GlobalService; // our global service

  constructor(router: Router, globalService: GlobalService) {
    this.router = router;
    this.globalService = globalService;
  }

  ngOnInit() {
    this.globalService.getAllUsers()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        let toSend = Array<User>();
        if (json.success) {
          for (let i = 0; i < json.rows.length; i++) {
            const user = json.rows[i];
            toSend.push(new User(user.user_id, user.fname, user.lname, user.email, user.addr, user.phone));
          }
        }
        this.users = toSend; // save all the users
      })
  }

  setUser(user: User) { // set the user for future use
    this.globalService.setCurrentUser(user);
    this.router.navigateByUrl('/dashboard');
  }

  onUserLogin(userFirstLast: String) { // login as user
    for (let i = 0; i < this.users.length; i++) {
      if (userFirstLast === (this.users[i].firstname + ' ' + this.users[i].lastname)) {
        this.setUser(this.users[i]);
        break;
      }
    }
  }

  onAdminLogin() { //login as admin
    this.router.navigateByUrl('/admin');
  }
}
