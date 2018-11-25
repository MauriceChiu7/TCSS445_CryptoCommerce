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

  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push('Coin', 'Seller', "Number of Coins", 'Price');
    return toSend;
  }

  getMyListings() {
    return this.globalService.getMyListings();
  }

  getBuyableListings() {
    return this.globalService.getBuyableListings();
  }

  getEquityForUser() {
    return this.globalService.getCoinEquityForUser();
  }

  createListing(numCoins: any, priceCoins: any, selectedCoin: any) {
    debugger;
  }
}
