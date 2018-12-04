import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { User } from '../models/user';
import { debug } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  globalService: GlobalService;
  currentUser: User;
  userBalance: any;
  router: Router;

  constructor(globalService: GlobalService, router: Router) {
    this.globalService = globalService;
    this.router = router;
  }

  ngOnInit() {
    this.currentUser = this.globalService.getCurrentUser();
    this.globalService.getBalance(this.currentUser.userId)
      .then(res => {
        let json = JSON.parse(JSON.stringify(res));
        if (json.success) { this.userBalance = json.rows[0].balance; }
      });
  }

  setBalance(value: string) {
    let newBalance = +Number.parseFloat(value).toFixed(2);
    this.globalService.setBalance(newBalance)
      .then(res => {
        let json = JSON.parse(JSON.stringify(res));
        debugger;
        if (json.success) { this.userBalance = Number.parseFloat(value).toFixed(2); }
      })
  }

  goToWallet() {
    this.router.navigateByUrl('/wallet');
  }

  goToTransfers() {
    this.router.navigateByUrl('/transfers');
  }

  goToTransactions() {
    this.router.navigateByUrl('/transactions');
  }
}
