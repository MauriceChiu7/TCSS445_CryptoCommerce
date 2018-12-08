export class Currency { // Currency object holding coin type and id
  coin: String;
  id;

  //constructor to create currency
  constructor(coin: String, id) {
      this.coin = coin;
      this.id = id;
  }
}
