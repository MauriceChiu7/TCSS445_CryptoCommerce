export class CoinTrade {
    coin: String;
    numberOfCoins: string;
    seller: String;
    price: string;
    orderid: any;
    cryptoid: any;

    constructor(coin: String, seller: String, numberOfCoins: string, price: string, orderid: any, crypto_Id: any) {
        this.coin = coin;
        this.seller = seller;
        this.numberOfCoins = numberOfCoins;
        this.price = price;
        this.orderid = orderid;
        this.cryptoid = crypto_Id;
    }
  }
