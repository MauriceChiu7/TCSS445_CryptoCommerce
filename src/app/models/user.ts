export class User {
    userId: Number;
    firstname: String;
    lastname: String;
    email: String;
    address: String;
    phone: String

    constructor(userId: Number, first: String, last: String, email: String, address: String, phone: String) {
        this.userId = userId;
        this.firstname = first;
        this.lastname = last;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
  }