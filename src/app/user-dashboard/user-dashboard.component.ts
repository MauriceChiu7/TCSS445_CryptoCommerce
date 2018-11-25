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
    this.userBalance = (100).toFixed(2);
  }

  setBalance(value: string) {
    this.userBalance = Number.parseFloat(value).toFixed(2);
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
