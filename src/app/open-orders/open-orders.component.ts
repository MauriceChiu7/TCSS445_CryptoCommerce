import { CoinEquity } from './../models/coinEquity';
import { CoinTrade } from './../models/coinTrade';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css']
})
export class OpenOrdersComponent implements OnInit {

  globalService: GlobalService;
  buyableListings: Array<CoinTrade>;
  myListings: Array<CoinTrade>;
  myCurrencies: Array<CoinEquity>;
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }


  ngOnInit() {
    //this.getAllOpenOrders();
    this.getAllOpenOrders();
    this.getMyCoins();
  }

  getMyCoins() {
    this.globalService.getCoinEquityForUser()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        const myCurrencies = new Array<CoinEquity>();
        if (json.success) {
          for (let i = 0; i < json.rows.length; i++) {
            myCurrencies.push(new CoinEquity(json.rows[i].currency_type, json.rows[i].num_of_coins,
                                 json.rows[i].price_per_unit, json.rows[i].Equity));
          }
        }
        this.myCurrencies = myCurrencies;
      })
  }

  getAllOpenOrders() {
    this.globalService.getAllOpenOrders()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          const buyable = new Array<CoinTrade>();
          const myListings = new Array<CoinTrade>();
          for (let i = 0; i < json.buyables.length; i++) {
            const row = json.buyables[i];
            buyable.push(new CoinTrade(row.currency_type, row.fname + ' ' + row.lname,
               row.num_of_coins, row.price_per_unit));
          }
          for (let i = 0; i < json.myListings.length; i++) {
            const row = json.myListings[i];
            myListings.push(new CoinTrade(row.currency_type, row.fname + ' ' + row.lname,
               row.num_of_coins, row.price_per_unit));
          }
          this.buyableListings = buyable;
          this.myListings = myListings;
        }
      });
  }

  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push('Coin', 'Seller', "Number of Coins", 'Price');
    return toSend;
  }

  getEquityForUser() {
    return this.globalService.getCoinEquityForUser();
  }



  _getCoinFromCurrency(selectedCoin: String): CoinEquity {
    for (let i = 0; i < this.myCurrencies.length; i++) {
      if (this.myCurrencies[i].coin === selectedCoin) {
        return this.myCurrencies[i];
      }
    }
  }

  createListing(selectedCoin: String) {
    //console.log(selectedCoin);
    const coinEquity = this._getCoinFromCurrency(selectedCoin);

  }
}
