export interface Phone {
  id: number;
  brand: string;
  model: string;
  os?: string;
  released: number;
  price: number;
  imageUrl?: string;
  description?: string;
}
