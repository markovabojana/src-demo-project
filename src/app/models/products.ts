export interface Products {
  products: Array<Product>;
}

export interface Product {
  id: Number;
  title: String;
  description: String;
  price: Number;
  discountPercentage: Number;
  rating: Number;
  stock: Number;
  brand: String;
  category: String;
  thumbnail: String;
  images: Array<String>;
}
