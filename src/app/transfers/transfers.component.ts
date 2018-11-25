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
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
  }

  ngOnInit() {

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

  getTransfers() {
    let toSend = this.globalService.getTransfers();
    for (let i = 0; i < toSend.length; i++) {
      if (toSend[i].sender_recipient === this.globalService.getCurrentUser().firstname 
                + ' ' + this.globalService.getCurrentUser().lastname) {
                  toSend.splice(i, 1);
                }
    }
    return toSend;
  }

  getEquityForUser() {
    return this.globalService.getCoinEquityForUser();
  }

  getRecipients() {
    let toSend = new Array<User>();
    const users = this.globalService.getAllUsers();
    const currUser = this.globalService.getCurrentUser();
    for (let i = 0; i < users.length; i++) {
      if (currUser.firstname !== users[i].firstname 
          && currUser.lastname !== users[i].lastname) {
            toSend.push(users[i]);
      }
    }
    debugger;
    return toSend;
  }

  transfer(recipient: String, coin: String, numberOfCoin: string) {
    debugger;
  }
}
