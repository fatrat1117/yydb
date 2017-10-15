export class User {
  id: string;
  name: string;
  avatar: string;
  balance: number;
  draws: { [id: string]: string[] }

  constructor(id: string) {
    this.id = id;
    this.draws = {};
  }

  updateBasicInfo(name: string, avatar: string, balance: number) {
    this.name = name;
    this.avatar = avatar;
    this.balance = balance;
  }
}
