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
  globalService: GlobalService;
  users: Array<User>;
  selectedUser: User;
  constructor(globalService: GlobalService) {
    this.globalService = globalService;
    this.users = globalService.getAllUsers();
    this.selectedUser = globalService.getAllUsers()[0];
  }
  devices = 'one two three'.split(' ');
  selectedDevice = 'two';

  onChange(newValue) {
    console.log(newValue);
    this.selectedUser = newValue;
    debugger;
    // ... do other stuff here ...
  }

  ngOnInit() {
    this.users = this.globalService.getAllUsers()
    this.selectedUser = this.users[0];
    debugger;
  }


  getTableHeaders() {
    let toSend: Array<String> = new Array<String>();
    toSend.push("Coin");
    toSend.push("Number of Coin(s)");
    toSend.push("Sender");
    toSend.push("Date");
    return toSend;
  }

  getTransfersInbound() {
    if (this.selectedUser!== null && this.selectedUser!== undefined) {
      let toSend: Array<Transfer> = new Array<Transfer>();
      let transfers = this.globalService.getTransfers();
      for (let i = 0; i < transfers.length; i++) {
        if (transfers[i].isInbound && 
            transfers[i].sender_recipient !== 
              this.selectedUser.firstname + ' ' + this.selectedUser.lastname) {
                toSend.push(transfers[i]);
        }
      }
      debugger;
      return toSend;
    }
  }



  getTransfersOutbound() {
    if (this.selectedUser!== null && this.selectedUser!== undefined) {
      let toSend: Array<Transfer> = new Array<Transfer>();
      let transfers = this.globalService.getTransfers();
      for (let i = 0; i < transfers.length; i++) {
        if (!transfers[i].isInbound && 
            transfers[i].sender_recipient !== 
              this.selectedUser.firstname + ' ' + this.selectedUser.lastname) {
                toSend.push(transfers[i]);
        }
      }
      debugger;
      return toSend;
    }

  }
}
