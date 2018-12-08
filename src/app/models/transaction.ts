export class Transaction { // Transaction object
    isInbound: Boolean;
    coin: String;
    numberOfCoins: string;
    pricePerUnit: String;
    date: Date;

    // Constructor to create a transactions
    constructor(isInbound: Boolean, coin: String, numberOfCoins: string, pricePerUnit: String, date: Date) {
        this.isInbound = isInbound;
        this.coin = coin;
        this.numberOfCoins = numberOfCoins;
        this.pricePerUnit = pricePerUnit;
        this.date = date;
    }
  }
