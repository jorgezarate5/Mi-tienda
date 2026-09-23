/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Aplicación de Tienda Online estilo Tiendanube
 * Desarrollada con React, TypeScript y Tailwind CSS.
 * Permite compra directa y finalización de pedidos por WhatsApp.
 * Totalmente editable tanto desde el código fuente como desde el Panel de Administración integrado.
 */

import React, { useRef } from 'react';
import {
  MessageCircle,
  Package,
  Search,
  SlidersHorizontal,
  Plus,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useStore } from './hooks/useStore';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

export default function App() {
  const {
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
  } = useStore();

  const catalogRef = useRef<HTMLDivElement>(null);

  // Filtrado de productos por categoría y texto de búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todos' || product.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleScrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1E1E1E]">
      
      {/* 1. Encabezado y Barra de Navegación Principal */}
      <Header
        config={config}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        categories={config.categories}
      />

      <main className="flex-1">
        {/* 2. Banner Principal & Beneficios (Hero Section) */}
        <HeroBanner config={config} onExploreClick={handleScrollToCatalog} />

        {/* 3. Catálogo de Productos en Cuadrícula (Grid) */}
        <section
          ref={catalogRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        >
          {/* Encabezado del Catálogo con Filtros y Contador */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-200">
            <div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Catálogo Exclusivo
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                {selectedCategory === 'Todos' ? 'Todos los Productos' : selectedCategory}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-medium tabular-nums">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'producto' : 'productos encontrados'}
              </span>

              {/* Botón rápido para agregar producto desde la vista principal */}
              <button
                onClick={() => setAdminOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-lg transition-colors border border-zinc-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Producto</span>
              </button>
            </div>
          </div>

          {/* Chips de filtro rápido en móviles */}
          <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pb-4 mb-4 no-scrollbar">
            {config.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white font-semibold'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cuadrícula de Tarjetas de Producto */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  config={config}
                  onAddToCart={(p) => addToCart(p, 1)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            /* Estado Vacío cuando no hay coincidencias */
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-lg mx-auto shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 mb-1">
                No encontramos productos que coincidan
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                Intenta con otros términos de búsqueda o selecciona otra categoría.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Todos');
                  }}
                  className="px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Restablecer filtros
                </button>
                <button
                  onClick={() => setAdminOpen(true)}
                  className="px-4 py-2 bg-zinc-100 text-zinc-800 text-xs font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Cargar nuevo producto
                </button>
              </div>
            </div>
          )}

          {/* Banner Informativo / Call to Action secundario */}
          <div className="mt-16 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>¿Buscas algo a medida o personalizado?</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                Hacé tu consulta directa con nuestro equipo
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
                Te asesoramos sobre stock, medidas especiales, presupuestos mayoristas o cualquier duda antes de comprar.
              </p>
            </div>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('¡Hola! Me gustaría hacer una consulta personalizada sobre sus productos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm shrink-0"
            >
              <MessageCircle className="w-5 h-5 fill-zinc-950" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      {/* 4. Pie de Página Elegante */}
      <Footer
        config={config}
        onOpenAdmin={() => setAdminOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
      />

      {/* 5. Botón Flotante de WhatsApp (Fijo en la esquina inferior derecha) */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola! Quisiera consultar por el catálogo online.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp directo"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          ¿Dudas? Chateemos
        </span>
      </a>

      {/* 6. Carrito Desplegable (Slide-over Drawer) */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        config={config}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* 7. Modal de Vista Rápida / Detalle de Producto */}
      <ProductDetailModal
        product={quickViewProduct}
        config={config}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => addToCart(p, qty)}
      />

      {/* 8. Panel de Administración de Productos y Configuración */}
      <AdminPanelModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        config={config}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onUpdateConfig={updateConfig}
        onResetDefaults={resetToDefaults}
      />
    </div>
  );
}
