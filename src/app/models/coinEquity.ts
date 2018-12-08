export class CoinEquity { // coin equity object
    coin: String;
    numberOfCoins: string;
    equity: string;
    pricePerUnit: string;
    id;

    //constructor to create the coin
    constructor(coin: String, numberOfCoins: string, pricePerUnit: string, equity: string, id) {
        this.coin = coin;
        this.numberOfCoins = numberOfCoins;
        this.equity = equity;
        this.pricePerUnit = pricePerUnit;
        this.id = id;
    }
  }
