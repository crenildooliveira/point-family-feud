// Tipos TypeScript para o aplicativo de delivery

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface Store {
  name: string;
  logo: string;
  isOpen: boolean;
  openTime?: string;
  minimumOrder?: number;
}