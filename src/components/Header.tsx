import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  X,
  Menu,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { StoreConfig } from '../types/store';

interface HeaderProps {
  config: StoreConfig;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all">
      {/* 1. Barra de Anuncios Superior estilo Tiendanube */}
      {config.showAnnouncement && !announcementDismissed && (
        <div className="bg-zinc-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center relative">
          <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto truncate px-6">
            <span className="truncate">{config.announcementText}</span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Cerrar anuncio"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Barra de Navegación Principal (One-Row Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 flex items-center justify-between gap-4">
          
          {/* Zona 1: Logo y Marca de la Tienda (Fácilmente reemplazable) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('Todos');
                onSearchChange('');
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              {config.logoUrl ? (
                <img
                  src={config.logoUrl}
                  alt={config.storeName}
                  className="h-9 w-auto max-w-[140px] object-contain"
                  onError={(e) => {
                    // Si la URL del logo falla, muestra el texto automáticamente
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold tracking-tighter text-lg shadow-xs group-hover:bg-zinc-800 transition-colors">
                  {config.storeName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
                  {config.storeName}
                </span>
                {config.storeTagline && (
                  <span className="hidden lg:block text-[11px] text-zinc-400 font-medium tracking-normal -mt-0.5 truncate max-w-[220px]">
                    {config.storeTagline}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Zona 2: Buscador Desktop Integrado */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar por nombre, categoría o detalle..."
                className="w-full pl-9 pr-9 py-2 bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 rounded-lg border border-transparent focus:border-zinc-300 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Zona 3: Acciones Principales (Admin, WhatsApp directo y Carrito) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Buscador móvil toggle */}
            <button
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Abrir buscador"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Botón WhatsApp directo de consulta */}
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola! Quisiera hacerles una consulta sobre su catálogo online.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/60"
              title="Chatear con el vendedor"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            {/* Botón Administrador / Configurar Tienda */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors border border-zinc-200"
              title="Administrar productos y datos de la tienda"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Panel Tienda</span>
            </button>

            {/* Carrito de Compras Desplegable con Contador */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-xs"
              aria-label={`Ver carrito de compras con ${cartCount} productos`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Carrito</span>
              <span className="tabular-nums font-bold bg-white text-zinc-900 text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Botón Menú Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Abrir menú de categorías"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Buscador expandido en móviles */}
        {showSearchMobile && (
          <div className="md:hidden pb-3 pt-1 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos..."
                autoFocus
                className="w-full pl-9 pr-9 py-2 bg-zinc-100 text-sm rounded-lg border border-zinc-200 focus:outline-none focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3. Barra de Categorías / Filtros Rápidos (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 border-t border-zinc-100 py-2.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Menú Drawer Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Categorías
          </div>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white font-medium'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>Chatear por WhatsApp</span>
            </a>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-zinc-700 bg-zinc-100 rounded-lg border border-zinc-200"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Administrar Tienda & Productos</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
