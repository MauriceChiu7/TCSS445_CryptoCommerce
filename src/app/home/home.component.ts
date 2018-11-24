import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //users = ["hari", "maurice", "aayush"];
  users : Array<User>;

  constructor() {

  }
  

  ngOnInit() {
    this.users = new Array<User>();
    this.users.push(new User(1, 'Hari', 'Kuduva', 'harikuduva@uw.edu', 'Court 17', '1234567890'));
    this.users.push(new User(2, 'Maurice', 'Chiu', 'mauricechiu@uw.edu', 'Court 18', '1234567891'));
    this.users.push(new User(3, 'Aayush', 'Shah', 'aayushshah@uw.edu', 'Court 19', '1234567892'));
  }


  setUser(user: any) {
    console.log(user);

  }
  onUserLogin(userFirstLast: String) {
    let selectedUser = this.users[0];
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (userFirstLast === (user.firstname + ' ' + user.lastname)) {
        selectedUser = user;
        break;
      }
    }
    console.log(selectedUser);
  }

  onAdminLogin() {
    console.log('Admin Login Pressed')

  }

}
