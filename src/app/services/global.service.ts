import { CoinEquity } from './../models/coinEquity';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CoinTrade } from '../models/coinTrade';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user: User; // The current user which was set on login
  http: HttpClient; // http client to hit backend endpoints

  constructor(http: HttpClient) {
    this.http = http;
  }

  setCurrentUser(user: User) { // set current user
    this.user = user;
  }

  /** Hits get-balance endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getBalance(userId: Number) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-balance',{"User_ID": userId}).toPromise();
  }

  // Returns the current user
  getCurrentUser() {
    return this.user;
  }

  /** Hits the buy endpoint. Need to supply user id, cyrpto id, # of coins, price/unit, and orderid to the endpiont,
   *  returns data in a promise format */
  buyListing(coin: CoinTrade) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/buy',{
      "User_ID": this.user.userId,
      "Crypto_ID": coin.cryptoid,
      "Num_of_Coins": coin.numberOfCoins,
      "Price_per_Unit": coin.price,
      "Order_ID": coin.orderid
    }).toPromise();
  }

  /** Hits the create-listing endpoint. Need to supply userid, cryptoid, order-type (buy/sell), # of coins and price/unit.
   *  Returns data in a promise format */
  createListing(coin: CoinEquity, numberCoins, pricePerUnit) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/create-order',{
      "User_ID": this.user.userId,
      "Crypto_ID": coin.id,
      "Order_Type": false,
      "Num_of_Coins": numberCoins,
      "Price_per_Unit": pricePerUnit
    }).toPromise();
  }

  /** Hits get-wallet endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getCoinEquityForUser() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-wallet',{"User_ID": this.user.userId}).toPromise();
  }

  /** Hits get-open-orders endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getAllOpenOrders() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-open-orders',{"User_ID": this.user.userId}).toPromise();
  }

  /** Hits get-transfers endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getTransfers() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-transfers',{"User_ID": this.user.userId}).toPromise();
  }

  /** Hits get-members endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getAllUsers() {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/get-members',{}).toPromise();
  }

  /** Hits get-recipients endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getAllRecipients() {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/get-recipients',{"User_ID": this.user.userId}).toPromise();
  }

  /** Hits set-balance endpoint. Need to supply a userId and newBalance to the endpoint, returns data in promise format */
  setBalance(newBalance: Number) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/set-balance',{
      "User_ID": this.user.userId,
      "New_Balance": newBalance
    }).toPromise();
  }

  /** Hits get-crypto-data endpoint. No data needed. Will return data in promise format */
  getCurrencies() {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/get-crypto-data',{}).toPromise();
  }

  /** Hits make-out-bound-transfer endpoint. Need to supply a userId, # of coins, recipient id, and crypto id.
   *  Returns data in a promise format */
  makeOutBoundTransfer(recipientUser: User, crypto_id, numberOfCoin) {
    return this.http.post('https://crypto-commerce-backend.herokuapp.com/make-out-bound-transfer',{
      "User_ID": this.user.userId,
      "Num_of_Coins": numberOfCoin,
      "Recipient_ID": recipientUser.userId,
      "Crypto_ID": crypto_id
    }).toPromise();
  }

  /** Hits get-transactions endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getTransactions() {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/get-transactions',{"User_ID": this.user.userId}).toPromise();
  }

  /** Hits admin-get-stats endpoint. Need to supply a userId to the endpoint, returns data in promise format */
  getAdminView(userId) {
    return this.http.post(' https://crypto-commerce-backend.herokuapp.com/admin-get-stats',{"User_ID": userId}).toPromise();
  }
}
