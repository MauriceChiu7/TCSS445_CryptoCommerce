export class CoinEquity {
    coin: String;
    numberOfCoins: string;
    equity: string;
    pricePerUnit: string;

    constructor(coin: String, numberOfCoins: string, pricePerUnit: string, equity: string) {
        this.coin = coin;
        this.numberOfCoins = numberOfCoins;
        this.equity = equity;
        this.pricePerUnit = pricePerUnit;
    }
  }
