import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Truck,
  MapPin,
  CreditCard,
  ChevronRight,
  Info,
} from 'lucide-react';
import { CartItem, CustomerOrderDetails, StoreConfig } from '../types/store';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  config: StoreConfig;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  config,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerOrderDetails>({
    customerName: '',
    customerPhone: '',
    deliveryType: 'shipping',
    address: '',
    paymentMethod: 'transfer',
    notes: '',
  });

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const installmentVal = Math.round(total / config.installmentsCount);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    const url = generateWhatsAppOrderUrl(items, config, customerDetails);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-2xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-zinc-200">
          
          {/* Header del Carrito */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-800" />
              <h2 className="text-base sm:text-lg font-bold text-zinc-900">
                Tu Carrito
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-zinc-200 text-zinc-800 rounded-full tabular-nums">
                {totalCount} {totalCount === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar carrito"
              className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido / Listado de Productos */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-zinc-800">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Explora nuestro catálogo y agrega los productos que más te gusten.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Listado de items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 bg-zinc-50/80 hover:bg-zinc-50 rounded-xl border border-zinc-200/80 transition-colors"
                    >
                      {/* Miniatura */}
                      <div className="w-18 h-18 bg-stone-200 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Detalles y controles */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-zinc-400 hover:text-red-500 p-1 transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-zinc-900 tabular-nums">
                          {formatCurrency(item.product.price, config.currencySymbol)}
                        </div>

                        {/* Modificador de Cantidad */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200/60">
                          <div className="inline-flex items-center border border-zinc-300 rounded-md bg-white">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-zinc-100 text-zinc-600 rounded-l transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold tabular-nums text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-zinc-100 text-zinc-600 rounded-r transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-zinc-700 tabular-nums">
                            {formatCurrency(
                              item.product.price * item.quantity,
                              config.currencySymbol
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vaciar carrito */}
                <div className="flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-zinc-400 hover:text-red-600 font-medium transition-colors"
                  >
                    Vaciar todo el carrito
                  </button>
                </div>

                {/* Formulario opcional para completar datos antes del chat */}
                {config.enableCustomerDetails && (
                  <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(!showOrderForm)}
                      className="w-full px-4 py-3 bg-zinc-50 hover:bg-zinc-100/70 flex items-center justify-between text-left text-xs font-semibold text-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>Completar datos de entrega (Opcional)</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-zinc-400 transition-transform ${
                          showOrderForm ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {showOrderForm && (
                      <div className="p-4 space-y-3 bg-white text-xs border-t border-zinc-200">
                        <div>
                          <label className="block font-medium text-zinc-700 mb-1">
                            Tu Nombre y Apellido
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: Laura Gómez"
                            value={customerDetails.customerName}
                            onChange={(e) =>
                              setCustomerDetails({
                                ...customerDetails,
                                customerName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs focus:outline-none focus:border-zinc-800"
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-zinc-700 mb-1">
                            Tipo de Entrega
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setCustomerDetails({
                                  ...customerDetails,
                                  deliveryType: 'shipping',
                                })
                              }
                              className={`py-2 px-2 rounded-lg border text-center font-medium transition-colors ${
                                customerDetails.deliveryType === 'shipping'
                                  ? 'border-zinc-900 bg-zinc-900 text-white'
                                  : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                              }`}
                            >
                              Envío a Domicilio
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setCustomerDetails({
                                  ...customerDetails,
                                  deliveryType: 'pickup',
                                })
                              }
                              className={`py-2 px-2 rounded-lg border text-center font-medium transition-colors ${
                                customerDetails.deliveryType === 'pickup'
                                  ? 'border-zinc-900 bg-zinc-900 text-white'
                                  : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                              }`}
                            >
                              Punto de Retiro
                            </button>
                          </div>
                        </div>

                        {customerDetails.deliveryType === 'shipping' && (
                          <div>
                            <label className="block font-medium text-zinc-700 mb-1">
                              Dirección / Ciudad de Entrega
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: Av. Santa Fe 1234, CABA"
                              value={customerDetails.address || ''}
                              onChange={(e) =>
                                setCustomerDetails({
                                  ...customerDetails,
                                  address: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs focus:outline-none focus:border-zinc-800"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block font-medium text-zinc-700 mb-1">
                            Preferencia de Pago
                          </label>
                          <select
                            value={customerDetails.paymentMethod}
                            onChange={(e) =>
                              setCustomerDetails({
                                ...customerDetails,
                                paymentMethod: e.target.value as any,
                              })
                            }
                            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-800"
                          >
                            <option value="transfer">Transferencia bancaria / CBU / Alias</option>
                            <option value="card_link">Tarjetas / Link de pago</option>
                            <option value="cash">Efectivo contra entrega</option>
                            <option value="to_agree">Acordar con el vendedor en el chat</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-zinc-700 mb-1">
                            Notas o Aclaraciones (Opcional)
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: Color preferido, horario de timbre..."
                            value={customerDetails.notes || ''}
                            onChange={(e) =>
                              setCustomerDetails({
                                ...customerDetails,
                                notes: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs focus:outline-none focus:border-zinc-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer del Carrito con Totales y Checkout WhatsApp */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50/90 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">
                    {formatCurrency(total, config.currencySymbol)}
                  </span>
                </div>
                {config.installmentsCount > 1 && (
                  <div className="flex justify-between text-emerald-700 font-medium text-[11px]">
                    <span>O hasta {config.installmentsCount} cuotas s/interés de</span>
                    <span className="tabular-nums font-semibold">
                      {formatCurrency(installmentVal, config.currencySymbol)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total a Pagar</span>
                  <span className="text-base sm:text-lg tabular-nums">
                    {formatCurrency(total, config.currencySymbol)}
                  </span>
                </div>
              </div>

              {/* Botón Principal: Finalizar compra vía WhatsApp */}
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Finalizar Compra por WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 text-center">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Se abrirá WhatsApp al número{' '}
                  <strong className="text-zinc-600 font-semibold">
                    +{config.whatsappNumber.replace(/[^0-9]/g, '')}
                  </strong>{' '}
                  con el detalle de tu pedido listo para enviar.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
