export class  Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  histories: string[];
  participants = 0;
  progress: number;

  constructor(id: string) {
    this.id = id;
  }
 
}