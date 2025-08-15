// Mock data para simular API de produtos e categorias
// Dados fictícios inspirados no modelo original

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

export const categories: Category[] = [
  { id: "populares", name: "Os Mais Pedidos", icon: "⭐" },
  { id: "hamburgueres", name: "Hambúrgueres", icon: "🍔" },
  { id: "bebidas", name: "Bebidas", icon: "🥤" },
  { id: "porcoes", name: "Porções", icon: "🍟" },
  { id: "sobremesas", name: "Sobremesas", icon: "🍰" },
];

export const products: Product[] = [
  // Os Mais Pedidos
  {
    id: "1",
    name: "Super Burgão",
    description: "Pão, maionese especial, hambúrguer artesanal, queijo cheddar e salada",
    price: 15.50,
    image: "/src/assets/burger-hero.jpg",
    category: "hamburgueres",
    popular: true
  },
  {
    id: "2", 
    name: "X-Completo",
    description: "Pão, maionese, hambúrguer, presunto, queijo, ovo e salada",
    price: 13.90,
    image: "/src/assets/burger-hero.jpg",
    category: "hamburgueres",
    popular: true
  },
  {
    id: "3",
    name: "Suco Natural 400ml",
    description: "Suco natural de frutas selecionadas, sem açúcar adicionado",
    price: 8.00,
    image: "/src/assets/juice.jpg",
    category: "bebidas",
    popular: true
  },
  {
    id: "4",
    name: "Mini Burgão",
    description: "Versão menor do nosso clássico, perfeito para petiscar",
    price: 6.00,
    image: "/src/assets/burger-hero.jpg",
    category: "hamburgueres",
    popular: true
  },
  {
    id: "5",
    name: "Batata Frita Média",
    description: "Batatas selecionadas, crocantes e douradas",
    price: 12.50,
    image: "/src/assets/fries.jpg",
    category: "porcoes",
    popular: true
  },
  {
    id: "6",
    name: "Batata Frita Grande",
    description: "Porção generosa de batatas crocantes",
    price: 17.50,
    image: "/src/assets/fries.jpg",
    category: "porcoes",
    popular: true
  },

  // Hambúrgueres Tradicionais
  {
    id: "7",
    name: "Duplo Cheddar",
    description: "Pão, maionese temperada, 2 hambúrgueres, muito cheddar e salada",
    price: 13.00,
    image: "/src/assets/burger-hero.jpg",
    category: "hamburgueres"
  },
  {
    id: "8",
    name: "X-Bacon Especial",
    description: "Pão, maionese temperada, hambúrguer, queijo, bacon e salada",
    price: 12.80,
    image: "/src/assets/burger-hero.jpg",
    category: "hamburgueres"
  },
  {
    id: "9", 
    name: "Filezinho",
    description: "Pão, maionese temperada, filé de frango, queijo e salada",
    price: 14.00,
    image: "/src/assets/burger-hero.jpg",
    category: "hamburgueres"
  },
  {
    id: "10",
    name: "X-Egg",
    description: "Pão, maionese temperada, hambúrguer, queijo, ovo e salada", 
    price: 12.50,
    image: "/src/assets/burger-hero.jpg",
    category: "hamburgueres"
  },

  // Bebidas
  {
    id: "11",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná, Fanta ou Sprite",
    price: 4.50,
    image: "/src/assets/juice.jpg",
    category: "bebidas"
  },
  {
    id: "12",
    name: "Água Mineral",
    description: "Água mineral sem gás 500ml",
    price: 3.00,
    image: "/src/assets/juice.jpg",
    category: "bebidas"
  },
  {
    id: "13",
    name: "Suco de Laranja",
    description: "Suco natural de laranja 400ml",
    price: 7.00,
    image: "/src/assets/juice.jpg",
    category: "bebidas"
  },

  // Sobremesas
  {
    id: "14",
    name: "Pudim Caseiro",
    description: "Pudim de leite condensado feito na casa",
    price: 8.50,
    image: "/src/assets/dessert.jpg",
    category: "sobremesas"
  },
  {
    id: "15",
    name: "Brownie com Sorvete",
    description: "Brownie de chocolate quente com bola de sorvete de baunilha",
    price: 12.00,
    image: "/src/assets/dessert.jpg",
    category: "sobremesas"
  }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "populares") {
    return products.filter(product => product.popular);
  }
  return products.filter(product => product.category === categoryId);
};

export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.popular);
};