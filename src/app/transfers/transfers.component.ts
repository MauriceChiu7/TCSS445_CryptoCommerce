import { Currency } from './../models/currency';
import { CoinEquity } from './../models/coinEquity';
import { Transfer } from './../models/transfer';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { User } from '../models/user';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

  globalService: GlobalService;
  myTransferHistory: Array<Transfer>;
  myCurrencies: Array<CoinEquity>;
  myRecipients: Array<User>;
  allCurrencies: Array<Currency>;
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }

  ngOnInit() {
    this.getTransfers();
    this.getRecipients();
    this.getEquityForUser();
    this.getCurrencies();
  }

  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push("Inbound/Outbound");
    toSend.push("Coin");
    toSend.push("Number of Coin(s)");
    toSend.push("Sender/Recipient");
    toSend.push("Date");
    return toSend;
  }

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

  _getRecipientUser(recipientFullName: String) {
    for (let i = 0; i < this.myRecipients.length; i++) {
      const curr = this.myRecipients[i];
      if (recipientFullName === curr.firstname + ' ' + curr.lastname) {
        return curr;
      }
    }
  }

  _getCryptoId(coinName: String) {
    for (let i = 0; i < this.allCurrencies.length; i++) {
      if (coinName === this.allCurrencies[i].coin) {
        return this.allCurrencies[i].id;
      }
    }
  }

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
