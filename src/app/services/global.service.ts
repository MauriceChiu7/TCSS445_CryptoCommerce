import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CoinEquity } from '../models/coinEquity';
import { CoinTrade } from '../models/coinTrade';
import { Transfer } from '../models/transfer';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user: User;
  constructor() { }

  setCurrentUser(user: User) {
    this.user = user;
  }

  getCurrentUser() {
    return this.user;
  }

  getCoinEquityForUser() {
    let toSend: Array<CoinEquity> = new Array<CoinEquity>();
    toSend.push(new CoinEquity('Bitcoin', (1).toFixed(2), (6000).toFixed(2)))
    toSend.push(new CoinEquity('Tether', (1).toFixed(2), (1).toFixed(2)))
    toSend.push(new CoinEquity('LiteCoin', (2).toFixed(2), (60).toFixed(2)))
    toSend.push(new CoinEquity('Dash', (1).toFixed(2), (92).toFixed(2)))
    return toSend;
  }

  getAllOpenOrders() {
    let toSend: Array<CoinTrade> = new Array<CoinTrade>();
    toSend.push(new CoinTrade('Bitcoin', 'Hari Kuduva', (1).toFixed(2), (100000).toFixed(2)));
    toSend.push(new CoinTrade('Bitcoin', 'Maurice Chiu', (1).toFixed(2), (100000).toFixed(2)));
    toSend.push(new CoinTrade('Bitcoin', 'Aayush Shah', (1).toFixed(2), (100000).toFixed(2)));
    return toSend

  }

  getBuyableListings() {
    let toSend = this.getAllOpenOrders();
    for (let i = 0; i < toSend.length; i++) {
      if (toSend[i].seller === (this.user.firstname + ' ' + this.user.lastname)) {
        toSend.splice(i, 1);
      }
    }
    return toSend;
  }

  getMyListings() {
    let values = this.getAllOpenOrders();
    let toSend = new Array<CoinTrade>();
    for (let i = 0; i < values.length; i++) {
      if (values[i].seller === (this.user.firstname + ' ' + this.user.lastname)) {
        toSend.push(values[i]);
      }
    }
    return toSend;
  }

  getTransfers() {
    let toSend = new Array<Transfer>();
    toSend.push(new Transfer(true, 'Bitcoin', (.5).toFixed(2), 'Aayush Shah', new Date()));
    toSend.push(new Transfer(true, 'Bitcoin', (.5).toFixed(2), 'Maurice Chiu', new Date()));
    toSend.push(new Transfer(true, 'Bitcoin', (.5).toFixed(2), 'Hari Kuduva', new Date()));
    toSend.push(new Transfer(false, 'Bitcoin', (.5).toFixed(2), 'Aayush Shah', new Date()));
    toSend.push(new Transfer(false, 'Bitcoin', (.5).toFixed(2), 'Hari Kuduva', new Date()));
    toSend.push(new Transfer(false, 'Bitcoin', (.5).toFixed(2), 'Maurice Chiu', new Date()));


    return toSend;
  }

  getAllUsers() {
    let toSend = new Array<User>();
    toSend.push(new User(1, 'Hari', 'Kuduva', 'harikuduva@uw.edu', 'Court 17', '1234567890'));
    toSend.push(new User(2, 'Maurice', 'Chiu', 'mauricechiu@uw.edu', 'Court 18', '1234567891'));
    toSend.push(new User(3, 'Aayush', 'Shah', 'aayushshah@uw.edu', 'Court 19', '1234567892'));
    return toSend;
  }

  getTransactions() {
    let toSend = new Array<Transaction>();
    toSend.push(new Transaction(true, 'Tether', (1).toFixed(2), (1).toFixed(2), new Date()));
    toSend.push(new Transaction(true, 'LiteCoin', (2).toFixed(2), (110).toFixed(2), new Date()));
    toSend.push(new Transaction(true, 'Dash', (1).toFixed(2), (90).toFixed(2), new Date()));
    toSend.push(new Transaction(false, 'Nano', (1).toFixed(2), (50).toFixed(2), new Date()));
    return toSend;
  }

}
