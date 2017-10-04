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
}
