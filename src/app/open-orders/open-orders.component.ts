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

  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }


  ngOnInit() {

  }


  getAllOpenOrders() {
    this.globalService.getAllOpenOrders()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          let buyable = new Array<CoinTrade>();
          let myListings = new Array<CoinTrade>();
          for (let i = 0; i < json.buyable.length; i++) {

          }

          for (let i = 0; i < json.mylistings.length; i++) {

          }
        }
      })

  }

  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push('Coin', 'Seller', "Number of Coins", 'Price');
    return toSend;
  }

  getMyListings() {
    //return this.globalService.getMyListings();
  }

  getBuyableListings() {
    //return this.globalService.getBuyableListings();
  }

  getEquityForUser() {
    return this.globalService.getCoinEquityForUser();
  }

  createListing(numCoins: any, priceCoins: any, selectedCoin: any) {
    debugger;
  }
}
