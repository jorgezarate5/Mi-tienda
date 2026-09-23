import React from 'react';
import { MessageCircle, ShieldCheck, CreditCard, SlidersHorizontal } from 'lucide-react';
import { StoreConfig } from '../types/store';

interface FooterProps {
  config: StoreConfig;
  onOpenAdmin: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenAdmin,
  onSelectCategory,
}) => {
  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Columna 1: Marca y Propósito */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              {config.logoUrl ? (
                <img
                  src={config.logoUrl}
                  alt={config.storeName}
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-bold tracking-tighter text-base">
                  {config.storeName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-display text-xl font-bold tracking-tight text-white">
                {config.storeName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {config.storeTagline ||
                'Tienda online con catálogo interactivo y pedidos directos a través de WhatsApp. Compras sencillas, transparentes y personalizadas.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Escribinos al WhatsApp</span>
              </a>

              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium rounded-lg transition-colors border border-zinc-700 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Administrar Tienda</span>
              </button>
            </div>
          </div>

          {/* Columna 2: Navegación de Categorías */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {config.categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información y Confianza */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Cómo Comprar
            </h4>
            <div className="space-y-2 text-xs text-zinc-400 leading-relaxed">
              <p>1. Agrega productos a tu carrito o presiona &quot;Pedir ya&quot;.</p>
              <p>2. Al finalizar, se abrirá WhatsApp con el resumen de tu compra.</p>
              <p>3. Coordinamos el pago y el envío directamente en el chat.</p>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center gap-2 text-zinc-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Atención 100% personalizada</span>
            </div>
          </div>
        </div>

        {/* Línea divisoria y Copyright */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {config.storeName}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Pedidos coordinados vía WhatsApp Oficial</span>
            <span>·</span>
            <span>{config.addressOrCity || 'Envíos a todo el país'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
