import { CoinEquity } from './../models/coinEquity';
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
  myCurrencies: Array<CoinEquity>;
  router: Router;
  constructor(globalService: GlobalService, router: Router) {
    this.tableHeaders = new Array<String>();
    this.globalService = globalService;
    this.router = router;
  }

  ngOnInit() {
    this.tableHeaders.push('Currency');
    this.tableHeaders.push('Number of Coins');
    this.tableHeaders.push('Price/Unit');
    this.tableHeaders.push('Total Equity');
    this.getMyCurrencies();
  }

  goToOpenOrders() {
    this.router.navigateByUrl('/open-orders');
  }

  getMyCurrencies() {
    this.globalService.getCoinEquityForUser()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        let toSend = Array<CoinEquity>();
        if (json.success) {
          debugger;
          for (let i = 0; i < json.rows.length; i++) {
            toSend.push(new CoinEquity(json.rows[i].currency_type, json.rows[i].num_of_coins,
                 json.rows[i].price_per_unit, json.rows[i].Equity));
          }
        }
        debugger;
        this.myCurrencies = toSend;
    });
  }

}
