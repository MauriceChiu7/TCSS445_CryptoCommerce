import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  globalService: GlobalService;
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }

  ngOnInit() {
  }

  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push("Bought/Sold");
    toSend.push("Coin");
    toSend.push("Number of Coin(s)");
    toSend.push("Price/Unit");
    toSend.push("Date");
    return toSend;
  }

  getTransactions() {
    return this.globalService.getTransactions();
  }


}
