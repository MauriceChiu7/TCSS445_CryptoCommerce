export class CoinTrade {
    coin: String;
    numberOfCoins: string;
    seller: String;
    price: string;

    constructor(coin: String, seller: String, numberOfCoins: string, price: string) {
        this.coin = coin;
        this.seller = seller;
        this.numberOfCoins = numberOfCoins;
        this.price = price;
    }
  }