import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "NVIDIA GeForce RTX 4090",
    category: Category.GPU,
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=60",
    description: "La carte graphique ultime pour les joueurs et les créateurs. Performances extrêmes.",
    specs: ["24GB GDDR6X", "Ada Lovelace Arch", "DLSS 3.0"]
  },
  {
    id: 2,
    name: "Intel Core i9-14900K",
    category: Category.CPU,
    price: 629.00,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60",
    description: "Processeur de bureau 24 cœurs débloqué. Idéal pour le gaming et le streaming.",
    specs: ["24 Cœurs", "6.0 GHz Boost", "LGA 1700"]
  },
  {
    id: 3,
    name: "HyperX Mechanical Keyboard",
    category: Category.PERIPHERALS,
    price: 129.99,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60",
    description: "Clavier mécanique RGB avec switches rouges pour une réactivité maximale.",
    specs: ["Switches Rouges", "RGB complet", "Châssis Alu"]
  },
  {
    id: 4,
    name: "Razer DeathAdder V3 Pro",
    category: Category.PERIPHERALS,
    price: 149.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60",
    description: "Souris ergonomique ultra-légère pour l'esport.",
    specs: ["63g", "30K DPI", "Sans fil"]
  },
  {
    id: 5,
    name: "ASUS ROG Swift OLED 27\"",
    category: Category.MONITORS,
    price: 999.00,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
    description: "Moniteur gaming OLED 240Hz pour des noirs profonds et une fluidité absolue.",
    specs: ["240Hz", "0.03ms", "OLED"]
  },
  {
    id: 6,
    name: "MSI Raider GE78 HX",
    category: Category.LAPTOPS,
    price: 2499.00,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop&q=60",
    description: "PC Portable surpuissant avec RTX 4080 et i9 pour jouer n'importe où.",
    specs: ["RTX 4080", "i9-13980HX", "32GB RAM"]
  },
  {
    id: 7,
    name: "AMD Ryzen 7 7800X3D",
    category: Category.CPU,
    price: 449.00,
    image: "https://images.unsplash.com/photo-1555616635-640960031668?w=800&auto=format&fit=crop&q=60",
    description: "Le meilleur CPU gaming du marché grâce à la technologie 3D V-Cache.",
    specs: ["8 Cœurs", "5.0 GHz", "AM5"]
  },
  {
    id: 8,
    name: "Corsair Dominator 32GB DDR5",
    category: Category.PERIPHERALS, 
    price: 189.99,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=60",
    description: "Mémoire RAM DDR5 haute performance avec éclairage RGB Capellix.",
    specs: ["6000MHz", "CL30", "RGB"]
  }
];

export const HERO_IMAGE = "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1920&auto=format&fit=crop&q=80"; // Dark gaming setup vibe