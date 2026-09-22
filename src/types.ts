export interface Product {
  id: string;
  name: string;
  category: 'bedding' | 'lighting' | 'wall-art' | 'plants-storage' | 'cozy-corner';
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  tag?: string;
  rating: number;
  reviewCount: number;
  dimensions?: string;
  material?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MoodCollection {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  featured: string;
}

export interface DecorIdea {
  id: string;
  title: string;
  note: string;
  category: 'storage' | 'lighting' | 'wall' | 'plants' | 'corner';
  image: string;
  icon: string;
  relatedProductId?: string;
}

export interface CoverFindItem {
  id: string;
  name: string;
  badgeLabel: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  productId: string;
  circlePos: {
    top: string;
    left?: string;
    right?: string;
  };
  labelPos: {
    top: string;
    left?: string;
    right?: string;
  };
  pointerDirection: 'down-right' | 'down-left' | 'left' | 'up-right' | 'up' | 'right' | 'up-left';
}

