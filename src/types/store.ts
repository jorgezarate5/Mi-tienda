/**
 * Tipos principales para la Tienda Online
 * Diseñado con una estructura clara y fácil de extender.
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Para mostrar precio tachado/descuento
  description: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
  featured?: boolean;
  badge?: string; // Ej: "Nuevo", "Destacado", "Más vendido"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreConfig {
  storeName: string;
  storeTagline: string;
  logoUrl: string;
  whatsappNumber: string; // Número con código de país, ej: "5491123456789"
  currencySymbol: string; // Ej: "$" o "USD"
  announcementText: string;
  showAnnouncement: boolean;
  categories: string[];
  bannerHeadline: string;
  bannerSubheadline: string;
  installmentsCount: number; // Ej: 3 cuotas sin interés
  enableCustomerDetails: boolean;
  addressOrCity: string;
  instagramHandle?: string;
}

export interface CustomerOrderDetails {
  customerName: string;
  customerPhone?: string;
  deliveryType: 'shipping' | 'pickup';
  address?: string;
  paymentMethod: 'transfer' | 'cash' | 'card_link' | 'to_agree';
  notes?: string;
}
