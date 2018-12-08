import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { User } from '../models/user';
import { Transfer } from '../models/transfer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  globalService: GlobalService; // Global Service, sential class
  users: Array<User>; // Array of users
  selectedUser: User; // The current selected user
  inboundTransfer: Array<Transfer>; // inbound transfers for the user
  outboundTransfer: Array<Transfer>; // outbound transfers for the user

  constructor(globalService: GlobalService) {
    this.globalService = globalService;
    this.getAllUsers();
  }

  onChange(newValue) {
    this.selectedUser = newValue;
    this.getData();
  }

  ngOnInit() { }

  getData() {
    this.globalService.getAdminView(this.selectedUser.userId)
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
          const incomingTransfers = new Array<Transfer>();
          const outgoingTransfers = new Array<Transfer>();
          for (let i = 0; i < json.incoming.length; i++) { // loop through incomeing transfers
            const inc = json.incoming[i];
            incomingTransfers.push(new Transfer(true, inc.currency_type, inc.num_of_coins,
               inc.fname + ' ' + inc.lname, inc.date_time));
          }
          for (let i = 0; i < json.outgoing.length; i++) { // loop through outgoing transfers
            const out = json.outgoing[i];
            outgoingTransfers.push(new Transfer(false, out.currency_type, out.num_of_coins,
              out.fname + ' ' + out.lname, out.date_time));
          }
          this.inboundTransfer = incomingTransfers; // save inbound transfers
          this.outboundTransfer = outgoingTransfers; // save outbound transfers
        }
      });
  }

  getAllUsers() { // get all Users for the app
    this.globalService.getAllUsers()
      .then(res => {
        const json = JSON.parse(JSON.stringify(res));
        if (json.success) {
            let toSend = Array<User>();
            for (let i = 0; i < json.rows.length; i++) {
              const user = json.rows[i];
              toSend.push(new User(user.user_id, user.fname, user.lname, user.email, user.addr, user.phone));
            }
            this.users = toSend;
            this.selectedUser = toSend[0];
            this.getData();
        }
    })
  }


  getTableHeaders() { // return he table headers that will be used
    let toSend: Array<String> = new Array<String>();
    toSend.push("Coin");
    toSend.push("Number of Coin(s)");
    toSend.push("Sender");
    toSend.push("Date");
    return toSend;
  }
}
