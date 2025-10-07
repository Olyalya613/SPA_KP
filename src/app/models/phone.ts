export interface Phone {
  id: number;
  brand: string;
  model: string;
  os: 'Android' | 'iOS' | 'other';
  price: number;
  released: number;
  description?: string;
  /** URL до зображення телефону: http(s) або data:base64 */
  imageUrl?: string;
}
