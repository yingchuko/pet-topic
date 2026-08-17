export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  moisture: number;
  tags: string[];
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: string[];
}
