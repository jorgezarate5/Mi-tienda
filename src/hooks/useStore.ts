import { useState, useEffect } from 'react';
import { CartItem, Product, StoreConfig } from '../types/store';
import { DEFAULT_STORE_CONFIG, INITIAL_PRODUCTS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'aurastore_products_v1',
  CONFIG: 'aurastore_config_v1',
  CART: 'aurastore_cart_v1',
};

export function useStore() {
  // Configuración de la tienda
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? { ...DEFAULT_STORE_CONFIG, ...JSON.parse(saved) } : DEFAULT_STORE_CONFIG;
    } catch {
      return DEFAULT_STORE_CONFIG;
    }
  });

  // Lista de productos
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Carrito de compras
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Estados de navegación e interfaz
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sincronizar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('No se pudo guardar la configuración en localStorage', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('No se pudieron guardar los productos en localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('No se pudo guardar el carrito en localStorage', e);
    }
  }, [cart]);

  // Acciones de Carrito
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Acciones de Gestión de Productos
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    // Actualizar también en el carrito si está presente
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === updatedProduct.id
          ? { ...item, product: updatedProduct }
          : item
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    removeFromCart(productId);
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_STORE_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  const updateConfig = (newConfig: Partial<StoreConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return {
    config,
    updateConfig,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaults,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalCount,
    cartSubtotal,
    cartOpen,
    setCartOpen,
    adminOpen,
    setAdminOpen,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    quickViewProduct,
    setQuickViewProduct,
  };
}
