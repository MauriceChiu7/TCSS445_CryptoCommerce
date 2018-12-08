import { Transaction } from './../models/transaction';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  globalService: GlobalService; // global service
  myTransactions: Array<Transaction>; // my transaction history
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }

  ngOnInit() {
    this.getTransactions();
  }

  // get the table headers
  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push("Bought/Sold");
    toSend.push("Coin");
    toSend.push("Number of Coin(s)");
    toSend.push("Price/Unit");
    toSend.push("Date");
    return toSend;
  }

  // get my transaction history
  getTransactions() {
    this.globalService.getTransactions()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          const toSend = new Array<Transaction>();
          for (let i = 0; i < json.trans.length; i++) {
            const el = json.trans[i];
            toSend.push(new Transaction(el.transaction_type, el.currency_type, el.num_of_coins, el.price_per_unit, el.date_time));
          }
          this.myTransactions = toSend;
        }
    })
  }
}
