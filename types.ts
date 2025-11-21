export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  specs: string[];
}

export enum Category {
  ALL = 'Tout',
  GPU = 'Cartes Graphiques',
  CPU = 'Processeurs',
  PERIPHERALS = 'Périphériques',
  LAPTOPS = 'PC Portables',
  MONITORS = 'Écrans'
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}