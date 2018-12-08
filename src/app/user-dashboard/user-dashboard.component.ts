import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  globalService: GlobalService; // global service
  currentUser: User; // user that is logged in
  userBalance: any; // user's balance
  router: Router; // router to navigate between pages

  constructor(globalService: GlobalService, router: Router) {
    this.globalService = globalService;
    this.router = router;
  }

  // on Intitialization of this component
  ngOnInit() {
    this.currentUser = this.globalService.getCurrentUser();
    this.globalService.getBalance(this.currentUser.userId)
      .then(res => {
        let json = JSON.parse(JSON.stringify(res));
        if (json.success) { this.userBalance = json.rows[0].balance; }
      });
  }

  // Set the balance of this user
  setBalance(value: string) {
    let newBalance = +Number.parseFloat(value).toFixed(2);
    this.globalService.setBalance(newBalance)
      .then(res => {
        let json = JSON.parse(JSON.stringify(res));
        if (json.success) { this.userBalance = Number.parseFloat(value).toFixed(2); }
      })
  }

  // Navigate to the wallet page
  goToWallet() {
    this.router.navigateByUrl('/wallet');
  }

  // Navigate to the transfer page
  goToTransfers() {
    this.router.navigateByUrl('/transfers');
  }

  // Navigate to the transactions page
  goToTransactions() {
    this.router.navigateByUrl('/transactions');
  }
}
