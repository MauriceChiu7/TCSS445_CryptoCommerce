import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CoinEquity } from '../models/coinEquity';
import { CoinTrade } from '../models/coinTrade';
import { Transfer } from '../models/transfer';
import { Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user: User;
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  getBalance(userId: Number) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-balance',{"User_ID": userId}).toPromise();
  }

  getCurrentUser() {
    return this.user;
  }

  getCoinEquityForUser() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-wallet',{"User_ID": this.user.userId}).toPromise();
  }

  getAllOpenOrders() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-open-orders',{"User_ID": this.user.userId}).toPromise();
  }
/*
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
  }*/

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
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-members',{}).toPromise();
  }

  setBalance(newBalance: Number) {
    debugger;
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/set-balance',{
      "User_ID": this.user.userId,
      "New_Balance": newBalance
    }).toPromise();
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
