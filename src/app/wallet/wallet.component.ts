import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  tableHeaders: Array<String>;
  globalService: GlobalService;
  router: Router;
  constructor(globalService: GlobalService, router: Router) {
    this.tableHeaders = new Array<String>();
    this.globalService = globalService;
    this.router = router;
  }

  ngOnInit() {
    this.tableHeaders.push('Currency');
    this.tableHeaders.push('Number of Coins');
    this.tableHeaders.push('Total Equity');
  }

  goToOpenOrders() {
    this.router.navigateByUrl('/open-orders');
  }

}
