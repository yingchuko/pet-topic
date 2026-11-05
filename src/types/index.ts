export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  moisture: number;
  protein?: number;
  calories?: number;
  tags: string[];
  image: string;
  ingredients?: string[];
  reviews?: { id: string; user: string; rating: number; comment: string }[];
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  petName: string;
  petType: "cat" | "dog";
  subscriptionStatus?: "active" | "paused" | "none";
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
  status: "processing" | "shipped" | "delivered";
}
