import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Eye, Tag } from 'lucide-react';
import { Product, StoreConfig } from '../types/store';
import { formatCurrency, generateWhatsAppDirectProductUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  config: StoreConfig;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  config,
  onAddToCart,
  onQuickView,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateWhatsAppDirectProductUrl(product, 1, config);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const installmentPrice = Math.round(product.price / config.installmentsCount);

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-xl border border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* 1. Contenedor de Imagen de Producto */}
      <div className="relative aspect-square sm:aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imageFailed && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        ) : (
          /* Fallback visual estilizado (Zero-Broken-Image Policy) */
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
            <Tag className="w-10 h-10 text-stone-300 mb-2" />
            <span className="text-xs text-stone-500 font-medium">{product.name}</span>
          </div>
        )}

        {/* Badge superior si existe */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/95 backdrop-blur-xs text-zinc-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-2xs border border-zinc-200/60 tracking-tight">
              {product.badge}
            </span>
          </div>
        )}

        {/* Botón flotante para vista rápida */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute right-3 top-3 p-2 bg-white/90 hover:bg-white text-zinc-700 hover:text-zinc-900 rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Ver detalle rápido"
          aria-label="Ver detalle rápido"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Información y Metadatos del Producto */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Categoría unboxed con tipografía limpia */}
          <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mb-1">
            {product.category}
          </div>

          {/* Título */}
          <h3 className="font-semibold text-zinc-900 text-sm sm:text-base leading-snug line-clamp-1 mb-1.5 group-hover:text-zinc-700 transition-colors">
            {product.name}
          </h3>

          {/* Breve descripción */}
          <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        <div>
          {/* Precios con tipografía tabular */}
          <div className="pt-2 border-t border-zinc-100 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-zinc-900 tabular-nums">
                {formatCurrency(product.price, config.currencySymbol)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-zinc-400 line-through tabular-nums">
                  {formatCurrency(product.originalPrice, config.currencySymbol)}
                </span>
              )}
            </div>

            {/* Cuotas sin interés */}
            {config.installmentsCount > 1 && (
              <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                {config.installmentsCount} cuotas s/interés de{' '}
                <span className="tabular-nums font-semibold">
                  {formatCurrency(installmentPrice, config.currencySymbol)}
                </span>
              </p>
            )}
          </div>

          {/* 3. Botones de Acción: Agregar al Carrito & Comprar directo vía WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all duration-150 ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="truncate">
                {addedAnimation ? '¡Agregado!' : 'Al carrito'}
              </span>
            </button>

            <button
              onClick={handleDirectWhatsApp}
              className="w-full py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              title="Pedir este producto directo por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span className="truncate">Pedir ya</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
