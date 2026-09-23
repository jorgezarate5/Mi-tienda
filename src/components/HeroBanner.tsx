import React from 'react';
import { Truck, CreditCard, MessageCircle, ShieldCheck } from 'lucide-react';
import { StoreConfig } from '../types/store';

interface HeroBannerProps {
  config: StoreConfig;
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ config, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F2EC] to-[#FAF8F5] border-b border-zinc-200/80">
      {/* Elemento de fondo sutil con geometría orgánica */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="absolute left-1/4 -bottom-20 w-80 h-80 rounded-full bg-stone-200/50 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full border border-stone-200/70 text-xs font-medium text-stone-700 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Catálogo actualizado · Atención por WhatsApp</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-tight md:leading-[1.15] mb-4">
            {config.bannerHeadline}
          </h1>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            {config.bannerSubheadline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
            >
              Explorar Catálogo
            </button>
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola! Me gustaría hacer una consulta personalizada.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-zinc-50 text-zinc-800 text-xs sm:text-sm font-semibold rounded-lg border border-zinc-200 shadow-2xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Franja de beneficios y confianza (Estilo Tiendanube) */}
      <div className="border-t border-stone-200/70 bg-white/70 backdrop-blur-xs py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-zinc-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-stone-100 text-zinc-800 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900">Envíos a Domicilio</p>
              <p className="text-zinc-500 text-[11px]">Coordinación directa</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-stone-100 text-zinc-800 shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900">{config.installmentsCount} Cuotas</p>
              <p className="text-zinc-500 text-[11px]">Sin interés con tarjetas</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-stone-100 text-zinc-800 shrink-0">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900">Compra por WhatsApp</p>
              <p className="text-zinc-500 text-[11px]">Sin registros ni trámites</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-stone-100 text-zinc-800 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900">Atención Personal</p>
              <p className="text-zinc-500 text-[11px]">100% de confianza</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
