import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { Product, StoreConfig } from '../types/store';
import { formatCurrency, generateWhatsAppDirectProductUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  config: StoreConfig;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  config,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const installmentPrice = Math.round(product.price / config.installmentsCount);
  const totalAmount = product.price * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const handleWhatsAppBuy = () => {
    const url = generateWhatsAppDirectProductUrl(product, quantity, config);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute right-4 top-4 z-10 p-2 text-zinc-400 hover:text-zinc-700 bg-white/80 hover:bg-white rounded-full transition-colors shadow-2xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Columna Izquierda: Imagen */}
          <div className="relative bg-stone-100 aspect-square md:aspect-auto md:min-h-[420px] flex items-center justify-center overflow-hidden">
            {!imageError && product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="p-8 text-center text-stone-400">
                <span className="text-sm font-medium">{product.name}</span>
              </div>
            )}

            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-white/95 text-zinc-900 text-xs font-semibold px-3 py-1 rounded-md shadow-2xs border border-zinc-200">
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Columna Derecha: Información y Compra */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-zinc-400 mb-1.5">
                {product.category}
              </div>

              <h2 className="font-display text-2xl font-bold text-zinc-900 mb-3">
                {product.name}
              </h2>

              {/* Precios */}
              <div className="mb-4 pb-4 border-b border-zinc-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-zinc-900 tabular-nums">
                    {formatCurrency(product.price, config.currencySymbol)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-zinc-400 line-through tabular-nums">
                      {formatCurrency(product.originalPrice, config.currencySymbol)}
                    </span>
                  )}
                </div>

                {config.installmentsCount > 1 && (
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    💳 Hasta {config.installmentsCount} cuotas sin interés de{' '}
                    <span className="tabular-nums font-semibold">
                      {formatCurrency(installmentPrice, config.currencySymbol)}
                    </span>
                  </p>
                )}
              </div>

              {/* Descripción completa */}
              <div className="text-zinc-600 text-sm leading-relaxed mb-6">
                <p>{product.description}</p>
              </div>

              {/* Selector de cantidad */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Cantidad
                </label>
                <div className="inline-flex items-center border border-zinc-300 rounded-lg p-1 bg-zinc-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 disabled:opacity-30 rounded hover:bg-zinc-200 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-semibold tabular-nums text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 rounded hover:bg-zinc-200 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
                {quantity > 1 && (
                  <span className="ml-3 text-xs text-zinc-500 tabular-nums">
                    Subtotal: {formatCurrency(totalAmount, config.currencySymbol)}
                  </span>
                )}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-100">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar {quantity > 1 ? `(${quantity})` : ''} al Carrito</span>
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Comprar ahora por WhatsApp</span>
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Envíos coordinados
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Stock garantizado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
