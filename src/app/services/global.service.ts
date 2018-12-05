import { CoinEquity } from './../models/coinEquity';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
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

  buyListing(coin: CoinTrade) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/buy',{
      "User_ID": this.user.userId,
      "Crypto_ID": coin.cryptoid,
      "Num_of_Coins": coin.numberOfCoins,
      "Price_per_Unit": coin.price,
      "Order_ID": coin.orderid
    }).toPromise();
  }

  createListing(coin: CoinEquity, numberCoins, pricePerUnit) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/create-order',{
      "User_ID": this.user.userId,
      "Crypto_ID": coin.id,
      "Order_Type": false,
      "Num_of_Coins": numberCoins,
      "Price_per_Unit": pricePerUnit
    }).toPromise();
  }

  getCoinEquityForUser() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-wallet',{"User_ID": this.user.userId}).toPromise();
  }

  getAllOpenOrders() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-open-orders',{"User_ID": this.user.userId}).toPromise();
  }

  getTransfers() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-transfers',{"User_ID": this.user.userId}).toPromise();
  }

  getAllUsers() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-members',{}).toPromise();
  }

  getAllRecipients() {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/get-recipients',{"User_ID": this.user.userId}).toPromise();
  }

  setBalance(newBalance: Number) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/set-balance',{
      "User_ID": this.user.userId,
      "New_Balance": newBalance
    }).toPromise();
  }

  getCurrencies() {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/get-crypto-data',{}).toPromise();
  }

  makeOutBoundTransfer(recipientUser: User, crypto_id, numberOfCoin) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/make-out-bound-transfer',{
      "User_ID": this.user.userId,
      "Num_of_Coins": numberOfCoin,
      "Recipient_ID": recipientUser.userId,
      "Crypto_ID": crypto_id
    }).toPromise();
  }

  getTransactions() {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/get-transactions',{"User_ID": this.user.userId}).toPromise();
  }

  getAdminView(userId) {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/admin-get-stats',{"User_ID": userId}).toPromise();
  }

}
