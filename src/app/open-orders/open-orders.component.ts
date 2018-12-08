import { CoinEquity } from './../models/coinEquity';
import { CoinTrade } from './../models/coinTrade';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html'
})
export class OpenOrdersComponent implements OnInit {

  globalService: GlobalService; // global service
  buyableListings: Array<CoinTrade>; // listings I can buy from
  myListings: Array<CoinTrade>; // listings I have created
  myCurrencies: Array<CoinEquity>; // My currencies I can list
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }


  ngOnInit() {
    this.getAllOpenOrders();
    this.getMyCoins();
  }

  // Get the cryptocurrencies I have
  getMyCoins() {
    this.globalService.getCoinEquityForUser()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        const myCurrencies = new Array<CoinEquity>();
        if (json.success) {
          for (let i = 0; i < json.rows.length; i++) {
            myCurrencies.push(new CoinEquity(json.rows[i].currency_type, json.rows[i].num_of_coins,
                                 json.rows[i].price_per_unit, json.rows[i].Equity, json.rows[i].crypto_id));
          }
        }
        this.myCurrencies = myCurrencies;
      })
  }

  // Get all the open orders (both my listing and other listings)
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
               row.num_of_coins, row.price_per_unit,row.order_id, row.crypto_id));
          }
          for (let i = 0; i < json.myListings.length; i++) {
            const row = json.myListings[i];
            myListings.push(new CoinTrade(row.currency_type, row.fname + ' ' + row.lname,
               row.num_of_coins, row.price_per_unit, row.order_id, row.crypto_id));
          }
          this.buyableListings = buyable;
          this.myListings = myListings;
        }
      });
  }

  // set the table headers
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

  createListing(selectedCoin: String, numberCoins, pricePerCoin) {
    if (numberCoins.length === 0 || pricePerCoin.length === 0) {
      console.log('must select inputs');
    } else {
      const coinEquity = this._getCoinFromCurrency(selectedCoin);
      this.globalService.createListing(coinEquity, numberCoins, pricePerCoin)
        .then(res => {
          const json = JSON.parse(JSON.stringify(res));
          if (json.success) {
            if (!json.error) {
              this.ngOnInit();
            } else if (json.errors.Not_enough_coins) {
              console.log('Not Enough Coins');
            }
          }
        })
    }
  }

  buyListing(coin: any) {
    console.log(coin);
    this.globalService.buyListing(coin)
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          if (!json.error) {
            console.log('Listing Bought');
            this.ngOnInit();
          } else if (json.errors.User_DNE) {
            console.log('User DNE');
          } else  if (json.errors.Not_enough_balance) {
            console.log('Insufficient Funds');
          }
        }
      })
  }
}
