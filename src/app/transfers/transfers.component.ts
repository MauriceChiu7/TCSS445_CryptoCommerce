import { Currency } from './../models/currency';
import { CoinEquity } from './../models/coinEquity';
import { Transfer } from './../models/transfer';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { User } from '../models/user';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html'
})
export class TransfersComponent implements OnInit {

  globalService: GlobalService; // global service
  myTransferHistory: Array<Transfer>; // my transfer history
  myCurrencies: Array<CoinEquity>; // currencies I have
  myRecipients: Array<User>; // recipients I can send to
  allCurrencies: Array<Currency>; // data for each crypto currency
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }

  ngOnInit() {
    this.getTransfers();
    this.getRecipients();
    this.getEquityForUser();
    this.getCurrencies();
  }

  //Return the table headers
  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push("Inbound/Outbound");
    toSend.push("Coin");
    toSend.push("Number of Coin(s)");
    toSend.push("Sender/Recipient");
    toSend.push("Date");
    return toSend;
  }

  // Get the currencies I have
  getCurrencies() {
    this.globalService.getCurrencies()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          let toSend = new Array<Currency>();
          for (let i = 0; i < json.rows.length; i++) {
            toSend.push(new Currency(json.rows[i].currency_type, json.rows[i].crypto_id));
          }
          this.allCurrencies = toSend;
        }
    })
  }

  // Get the transfer history for the user
  getTransfers() {
    this.globalService.getTransfers()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          if (!json.error) {
            let toSend = new Array<Transfer>();
            for (let i = 0; i < json.rows.length; i++) {
              const transfer = json.rows[i];
              const isInbound = this.globalService.getCurrentUser().userId === transfer.recipient_id;
              toSend.push(new Transfer(isInbound, transfer.currency_type,
                transfer.num_of_coins,
                 isInbound ? transfer.user_f + ' ' + transfer.user_l : transfer.rec_f + ' ' + transfer.rec_l,
                  transfer.date_time));
            }
            this.myTransferHistory = toSend;
          } else if (json.errors.User_DNE) {
            console.log('No Incoming or Outbound transfers');
          }
        }
    });
  }

  // Get the coins I can transfer out
  getEquityForUser() {
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

  // Get the recipeients I can send coins too
  getRecipients() {
    this.globalService.getAllRecipients()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          let recipients = new Array<User>();
          for (let i = 0; i < json.rows.length; i++) {
            const el = json.rows[i];
            recipients.push(new User(el.user_id, el.fname, el.lname, el.email, el.addr, el.phone));
          }
          this.myRecipients = recipients;
        }
      })
  }

  // Get recipients object from full name
  _getRecipientUser(recipientFullName: String) {
    for (let i = 0; i < this.myRecipients.length; i++) {
      const curr = this.myRecipients[i];
      if (recipientFullName === curr.firstname + ' ' + curr.lastname) {
        return curr;
      }
    }
  }

  // Get Cyrpto Data object using coin name
  _getCryptoId(coinName: String) {
    for (let i = 0; i < this.allCurrencies.length; i++) {
      if (coinName === this.allCurrencies[i].coin) {
        return this.allCurrencies[i].id;
      }
    }
  }

  // Make an outbound transfer
  transfer(recipient: String, coin: String, numberOfCoin: string) {
    if (coin.length === 0) {
      console.log('Must specify number of coins to make outbound transfer');
    } else {
      const recipientUser: User = this._getRecipientUser(recipient);
      const crypto_id = this._getCryptoId(coin);
      this.globalService.makeOutBoundTransfer(recipientUser, crypto_id, numberOfCoin)
        .then(res => {
          const json = JSON.parse(JSON.stringify(res));
          if (json.success) {
            if (!json.error) {
              this.ngOnInit();
            } else if (json.errors.Have_coin_not_enough) {
              console.log('Not enough coins in your wallet to transfer');
            }
          }
      });
    }
  }
}
