export class  Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  histories: string[];
  participants = 0;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

  }
 
}