import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Settings,
  Package,
  RotateCcw,
  Check,
  Upload,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { Product, StoreConfig } from '../types/store';
import { formatCurrency } from '../utils/whatsapp';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  config: StoreConfig;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateConfig: (newConfig: Partial<StoreConfig>) => void;
  onResetDefaults: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  config,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateConfig,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'store'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Formulario de Producto (Crear o Editar)
  const [prodForm, setProdForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: config.categories[1] || 'General',
    imageUrl: '',
    badge: '',
    inStock: true,
  });

  // Formulario de Configuración
  const [configForm, setConfigForm] = useState<StoreConfig>({ ...config });

  if (!isOpen) return null;

  // Manejador para abrir formulario de edición
  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setProdForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      badge: product.badge || '',
      inStock: product.inStock,
    });
  };

  // Manejador para abrir formulario de creación
  const handleStartCreate = () => {
    setEditingProduct(null);
    setIsCreating(true);
    setProdForm({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      category: config.categories[1] || 'General',
      imageUrl: '',
      badge: '',
      inStock: true,
    });
  };

  // Subir imagen local como Data URL Base64 para el producto
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setProdForm((prev) => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Subir logo local como Data URL Base64
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setConfigForm((prev) => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar producto (Crear o Actualizar)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(prodForm.price) || 0;
    const origPriceNum = prodForm.originalPrice ? parseFloat(prodForm.originalPrice) : undefined;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: prodForm.name,
        price: priceNum,
        originalPrice: origPriceNum,
        description: prodForm.description,
        category: prodForm.category,
        imageUrl: prodForm.imageUrl || editingProduct.imageUrl,
        badge: prodForm.badge || undefined,
        inStock: prodForm.inStock,
      });
      setEditingProduct(null);
    } else if (isCreating) {
      onAddProduct({
        name: prodForm.name,
        price: priceNum,
        originalPrice: origPriceNum,
        description: prodForm.description,
        category: prodForm.category,
        imageUrl: prodForm.imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
        badge: prodForm.badge || undefined,
        inStock: prodForm.inStock,
        featured: false,
      });
      setIsCreating(false);
    }

    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  // Guardar configuración general de la tienda
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(configForm);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Panel */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-900">
                Panel de Administración de Tienda
              </h2>
              <p className="text-xs text-zinc-500">
                Administra tus productos, teléfono de WhatsApp y personalización
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar panel"
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-zinc-200 px-5 bg-white shrink-0">
          <button
            onClick={() => {
              setActiveTab('products');
              setIsCreating(false);
              setEditingProduct(null);
            }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'store'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración & WhatsApp</span>
          </button>
        </div>

        {/* Notificación de cambios guardados */}
        {saveFeedback && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs text-emerald-800 flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>¡Cambios guardados con éxito en tu tienda!</span>
          </div>
        )}

        {/* Cuerpo del Panel */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'products' && (
            <div>
              {/* Si está en modo Formulario (Creando o Editando) */}
              {isCreating || editingProduct ? (
                <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-900">
                      {editingProduct ? 'Editar Producto' : 'Cargar Nuevo Producto'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingProduct(null);
                      }}
                      className="text-xs text-zinc-500 hover:text-zinc-800 underline"
                    >
                      Cancelar
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Título del Producto *
                        </label>
                        <input
                          type="text"
                          required
                          value={prodForm.name}
                          onChange={(e) =>
                            setProdForm({ ...prodForm, name: e.target.value })
                          }
                          placeholder="Ej: Florero de Gres Blanco"
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Categoría
                        </label>
                        <select
                          value={prodForm.category}
                          onChange={(e) =>
                            setProdForm({ ...prodForm, category: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                        >
                          {config.categories
                            .filter((c) => c !== 'Todos')
                            .map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Precio ({config.currencySymbol}) *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          value={prodForm.price}
                          onChange={(e) =>
                            setProdForm({ ...prodForm, price: e.target.value })
                          }
                          placeholder="38500"
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Precio Original / Antes (Opcional para tachado)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={prodForm.originalPrice}
                          onChange={(e) =>
                            setProdForm({ ...prodForm, originalPrice: e.target.value })
                          }
                          placeholder="44000"
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Descripción Breve del Producto *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={prodForm.description}
                        onChange={(e) =>
                          setProdForm({ ...prodForm, description: e.target.value })
                        }
                        placeholder="Describe los materiales, dimensiones, uso recomendado..."
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                      />
                    </div>

                    {/* Foto del Producto: URL o Archivo */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-zinc-700">
                        Foto del Producto (URL directa o subir desde tu equipo)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={prodForm.imageUrl}
                            onChange={(e) =>
                              setProdForm({ ...prodForm, imageUrl: e.target.value })
                            }
                            placeholder="https://... o pega una URL de imagen"
                            className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                          />
                        </div>
                        <div>
                          <label className="flex items-center justify-center gap-1.5 px-3 py-2 border border-zinc-300 rounded-lg text-xs font-medium bg-white hover:bg-zinc-100 cursor-pointer text-zinc-700">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Subir Archivo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      {prodForm.imageUrl && (
                        <div className="flex items-center gap-3 pt-1">
                          <div className="w-12 h-12 rounded-md bg-stone-200 overflow-hidden border">
                            <img
                              src={prodForm.imageUrl}
                              alt="Vista previa"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[11px] text-zinc-500">
                            Vista previa de imagen cargada
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Etiqueta / Badge (Opcional)
                        </label>
                        <input
                          type="text"
                          value={prodForm.badge}
                          onChange={(e) =>
                            setProdForm({ ...prodForm, badge: e.target.value })
                          }
                          placeholder="Ej: Nuevo, Destacado, 20% OFF"
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
                          <input
                            type="checkbox"
                            checked={prodForm.inStock}
                            onChange={(e) =>
                              setProdForm({ ...prodForm, inStock: e.target.checked })
                            }
                            className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                          />
                          <span>Producto con Stock Disponible</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreating(false);
                          setEditingProduct(null);
                        }}
                        className="px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xs"
                      >
                        {editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">
                      Catálogo Actual ({products.length} productos)
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Puedes agregar nuevos productos o editar/eliminar los existentes.
                    </p>
                  </div>
                  <button
                    onClick={handleStartCreate}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Cargar Nuevo Producto</span>
                  </button>
                </div>
              )}

              {/* Lista de Productos en Tabla / Tarjetas compactas */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-200">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 sm:p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-zinc-200">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-semibold text-zinc-900">
                            {prod.name}
                          </h4>
                          {prod.badge && (
                            <span className="text-[10px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 font-medium">
                              {prod.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                          <span className="font-bold text-zinc-800 tabular-nums">
                            {formatCurrency(prod.price, config.currencySymbol)}
                          </span>
                          <span>·</span>
                          <span>{prod.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleStartEdit(prod)}
                        className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg text-xs flex items-center gap-1 font-medium transition-colors"
                        title="Editar producto"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>

                      <button
                        onClick={() => {
                          if (
                            confirm(`¿Seguro que deseas eliminar "${prod.name}"?`)
                          ) {
                            onDeleteProduct(prod.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs flex items-center gap-1 font-medium transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <form onSubmit={handleSaveConfig} className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1">
                  Identidad & WhatsApp del Vendedor
                </h3>
                <p className="text-xs text-zinc-500">
                  Configura los datos clave de tu tienda para que los pedidos lleguen a tu número de WhatsApp.
                </p>
              </div>

              {/* Teléfono de WhatsApp (Destacado) */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-emerald-900">
                  📱 Número de WhatsApp para recibir pedidos (Configurable) *
                </label>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-600 text-white rounded-lg">
                    <MessageCircle className="w-4 h-4 fill-white" />
                  </div>
                  <input
                    type="text"
                    required
                    value={configForm.whatsappNumber}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, whatsappNumber: e.target.value })
                    }
                    placeholder="Ej: 5491123456789 (con código de país sin +)"
                    className="flex-1 px-3 py-2 border border-emerald-300 rounded-lg text-xs sm:text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-emerald-800 leading-normal flex items-start gap-1">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    Ingresa el número con el código de país sin símbolos. Ejemplos:
                    Argentina (549 + área + número, ej: <strong>5491133334444</strong>),
                    México (521...), Colombia (57...), España (34...).
                  </span>
                </p>
              </div>

              {/* Nombre y Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Nombre de la Tienda *
                  </label>
                  <input
                    type="text"
                    required
                    value={configForm.storeName}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, storeName: e.target.value })
                    }
                    placeholder="Ej: AURA"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Eslogan o Subtítulo
                  </label>
                  <input
                    type="text"
                    value={configForm.storeTagline}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, storeTagline: e.target.value })
                    }
                    placeholder="Ej: Decoración & Hogar"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              {/* URL o Archivo del Logo */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-700">
                  Logo de la Tienda (URL o subir archivo)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={configForm.logoUrl}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, logoUrl: e.target.value })
                    }
                    placeholder="https://... o déjalo vacío para logo tipográfico"
                    className="sm:col-span-2 px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                  />
                  <label className="flex items-center justify-center gap-1.5 px-3 py-2 border border-zinc-300 rounded-lg text-xs font-medium bg-white hover:bg-zinc-100 cursor-pointer text-zinc-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Moneda y Cuotas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Símbolo de Moneda
                  </label>
                  <input
                    type="text"
                    value={configForm.currencySymbol}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, currencySymbol: e.target.value })
                    }
                    placeholder="$ o USD"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Cantidad de Cuotas Sin Interés
                  </label>
                  <select
                    value={configForm.installmentsCount}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        installmentsCount: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                  >
                    <option value={1}>1 cuota (Sin aviso de cuotas)</option>
                    <option value={3}>3 cuotas sin interés</option>
                    <option value={6}>6 cuotas sin interés</option>
                    <option value={12}>12 cuotas sin interés</option>
                  </select>
                </div>
              </div>

              {/* Barra de Anuncios */}
              <div className="space-y-2 pt-2 border-t border-zinc-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-800">
                    Barra de Anuncios Superior
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configForm.showAnnouncement}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          showAnnouncement: e.target.checked,
                        })
                      }
                      className="rounded border-zinc-300 text-zinc-900"
                    />
                    <span>Mostrar barra</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={configForm.announcementText}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      announcementText: e.target.value,
                    })
                  }
                  placeholder="Texto promocional que aparece en la parte superior..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                />
              </div>

              {/* Textos del Banner Hero */}
              <div className="space-y-2 pt-2 border-t border-zinc-200">
                <label className="block text-xs font-semibold text-zinc-800">
                  Titulares del Banner Principal
                </label>
                <input
                  type="text"
                  value={configForm.bannerHeadline}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, bannerHeadline: e.target.value })
                  }
                  placeholder="Título principal del banner..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900 mb-2"
                />
                <textarea
                  rows={2}
                  value={configForm.bannerSubheadline}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, bannerSubheadline: e.target.value })
                  }
                  placeholder="Subtítulo o descripción breve del banner..."
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-xs bg-white focus:outline-none focus:border-zinc-900"
                />
              </div>

              {/* Botón Guardar Configuración */}
              <div className="pt-4 flex items-center justify-between border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        '¿Restaurar los valores iniciales de la tienda y productos de ejemplo?'
                      )
                    ) {
                      onResetDefaults();
                      onClose();
                    }
                  }}
                  className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer valores de fábrica</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Guardar Configuración
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
