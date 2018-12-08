export class Transfer { // Transfer object
    isInbound: Boolean;
    coin: String;
    numberOfCoins: string;
    sender_recipient: String;
    date: Date;

    // constructor to create a transfer
    constructor(isInbound: Boolean, coin: String, numberOfCoins: string, sender_recipient: String, date: Date) {
        this.isInbound = isInbound;
        this.coin = coin;
        this.numberOfCoins = numberOfCoins;
        this.sender_recipient = sender_recipient;
        this.date = date;
    }
  }
