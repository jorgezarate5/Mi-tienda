import { Product, StoreConfig } from '../types/store';

/**
 * =========================================================================
 * CONFIGURACIÓN PREDETERMINADA DE LA TIENDA
 * Puedes modificar estos valores aquí en el código o desde el panel "Configuración"
 * en la barra superior de la tienda.
 * =========================================================================
 */
export const DEFAULT_STORE_CONFIG: StoreConfig = {
  // Nombre de la marca que aparece en la cabecera
  storeName: 'AURA',
  // Eslogan o subtítulo breve
  storeTagline: 'Objetos conscientes para el hogar y la vida diaria',
  // URL del logo (si está vacío, se mostrará el isotipo tipográfico minimalista)
  logoUrl: '',
  // Número de WhatsApp del vendedor (incluye código de país sin '+', ej: 5491123456789)
  // Argentina: 549..., México: 52..., Colombia: 57..., España: 34..., etc.
  whatsappNumber: '5491133334444',
  // Símbolo de moneda
  currencySymbol: '$',
  // Barra de anuncios superior (estilo Tiendanube)
  announcementText: '✨ 3 cuotas sin interés con todas las tarjetas · Envío gratis a partir de $45.000',
  showAnnouncement: true,
  // Lista de categorías para filtros
  categories: ['Todos', 'Cerámica & Deco', 'Textiles', 'Aromas & Velas', 'Accesorios'],
  // Contenido del Banner Principal (Hero)
  bannerHeadline: 'Elegancia serena para tu espacio cotidiano',
  bannerSubheadline: 'Piezas artesanales, materiales nobles y diseño atemporal seleccionados con dedicación.',
  installmentsCount: 3,
  enableCustomerDetails: true,
  addressOrCity: 'Buenos Aires, Argentina',
  instagramHandle: 'aurastore.ar',
};

/**
 * SVGs minimalistas estilizados y de alta fidelidad para servir como imágenes
 * elegantes y 100% resilientes que nunca se rompen en el navegador.
 */
const SVG_CERAMIC_VASE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="%23F4EFEA"/>
  <circle cx="250" cy="230" r="160" fill="%23ECE3D8" opacity="0.6"/>
  <path d="M210 110 L290 110 C290 150 330 190 330 280 C330 360 290 390 250 390 C210 390 170 360 170 280 C170 190 210 150 210 110 Z" fill="%23D8CBC0"/>
  <ellipse cx="250" cy="110" rx="40" ry="10" fill="%23C2B1A2"/>
  <ellipse cx="250" cy="108" rx="30" ry="7" fill="%23A89484"/>
  <path d="M250 110 Q280 200 270 320" stroke="%23BFAFA1" stroke-width="3" fill="none" opacity="0.4"/>
  <line x1="130" y1="420" x2="370" y2="420" stroke="%23D6C5B6" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const SVG_LINEN_SHIRT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="%23F3F1EC"/>
  <circle cx="250" cy="250" r="170" fill="%23E7E3D8" opacity="0.5"/>
  <!-- Folded linen shirt -->
  <path d="M150 150 L350 150 L370 370 L130 370 Z" fill="%23DFD9CC" rx="8"/>
  <path d="M150 150 L220 220 L280 220 L350 150 L310 120 L250 140 L190 120 Z" fill="%23D0C7B6"/>
  <path d="M250 140 L250 370" stroke="%23BDB29F" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="250" cy="250" r="4" fill="%238C7E6A"/>
  <circle cx="250" cy="290" r="4" fill="%238C7E6A"/>
  <circle cx="250" cy="330" r="4" fill="%238C7E6A"/>
  <!-- Pocket accent -->
  <rect x="280" y="230" width="45" height="55" rx="3" fill="%23D6CCBA" stroke="%23C3B7A3" stroke-width="1.5"/>
</svg>`;

const SVG_SOY_CANDLE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="%23F7F4EF"/>
  <!-- Glow -->
  <circle cx="250" cy="180" r="45" fill="%23FCE8B3" opacity="0.4"/>
  <!-- Jar -->
  <rect x="180" y="210" width="140" height="170" rx="8" fill="%23B86B35"/>
  <rect x="180" y="210" width="140" height="170" rx="8" fill="url(%23amberGrad)"/>
  <!-- Label -->
  <rect x="200" y="250" width="100" height="90" rx="2" fill="%23F6EFE6"/>
  <line x1="215" y1="275" x2="285" y2="275" stroke="%234A3E38" stroke-width="3"/>
  <line x1="225" y1="290" x2="275" y2="290" stroke="%238A776D" stroke-width="1.5"/>
  <line x1="230" y1="310" x2="270" y2="310" stroke="%23B3A59B" stroke-width="1"/>
  <!-- Lid & Rim -->
  <ellipse cx="250" cy="210" rx="70" ry="12" fill="%235C3A21"/>
  <!-- Flame -->
  <path d="M250 170 Q260 190 250 205 Q240 190 250 170 Z" fill="%23FFB703"/>
  <path d="M250 182 Q255 195 250 205 Q245 195 250 182 Z" fill="%23FFF"/>
</svg>`;

const SVG_LEATHER_TOTE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="%23F5F1EB"/>
  <!-- Straps -->
  <path d="M200 240 C200 120 220 90 250 90 C280 90 300 120 300 240" fill="none" stroke="%237A4725" stroke-width="10" stroke-linecap="round"/>
  <!-- Bag Body -->
  <path d="M150 220 L350 220 L335 410 L165 410 Z" fill="%239E6038" rx="6"/>
  <!-- Top lip -->
  <path d="M150 220 L350 220" stroke="%237A4725" stroke-width="6"/>
  <!-- Stitching -->
  <line x1="165" y1="235" x2="335" y2="235" stroke="%237A4725" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="175" y1="240" x2="175" y2="395" stroke="%237A4725" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="325" y1="240" x2="325" y2="395" stroke="%237A4725" stroke-width="1.5" stroke-dasharray="4 3"/>
</svg>`;

const SVG_CERAMIC_CUP = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="%23EFECE6"/>
  <!-- Handle -->
  <path d="M300 220 C360 220 360 300 300 300" fill="none" stroke="%23A39281" stroke-width="14" stroke-linecap="round"/>
  <!-- Cup body -->
  <path d="M170 190 L310 190 C310 270 290 340 240 340 C190 340 170 270 170 190 Z" fill="%23C9BEB2"/>
  <ellipse cx="240" cy="190" rx="70" ry="14" fill="%23DDD5CC"/>
  <ellipse cx="240" cy="190" rx="55" ry="9" fill="%23826C59"/>
  <!-- Texture dots -->
  <circle cx="210" cy="240" r="2" fill="%23746659" opacity="0.6"/>
  <circle cx="260" cy="270" r="2.5" fill="%23746659" opacity="0.6"/>
  <circle cx="230" cy="295" r="1.5" fill="%23746659" opacity="0.6"/>
</svg>`;

const SVG_AROMA_DIFFUSER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="%23F4EFEA"/>
  <!-- Reeds / Sticks -->
  <line x1="250" y1="270" x2="190" y2="120" stroke="%2370533C" stroke-width="4" stroke-linecap="round"/>
  <line x1="250" y1="270" x2="230" y2="100" stroke="%2370533C" stroke-width="4" stroke-linecap="round"/>
  <line x1="250" y1="270" x2="270" y2="105" stroke="%2370533C" stroke-width="4" stroke-linecap="round"/>
  <line x1="250" y1="270" x2="310" y2="125" stroke="%2370533C" stroke-width="4" stroke-linecap="round"/>
  <!-- Glass bottle -->
  <rect x="200" y="260" width="100" height="120" rx="10" fill="%232E403B" opacity="0.85"/>
  <rect x="225" y="240" width="50" height="20" rx="3" fill="%23C9AF7B"/>
  <!-- Label -->
  <rect x="215" y="290" width="70" height="60" rx="2" fill="%23F4EFEA"/>
  <line x1="225" y1="310" x2="275" y2="310" stroke="%232E403B" stroke-width="2"/>
  <line x1="230" y1="322" x2="270" y2="322" stroke="%2370533C" stroke-width="1"/>
</svg>`;

/**
 * =========================================================================
 * CATÁLOGO DE PRODUCTOS INICIAL
 * Puedes añadir, editar y eliminar productos fácilmente desde aquí o desde el panel web.
 * =========================================================================
 */
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Florero Escultórico Duna',
    price: 38500,
    originalPrice: 44000,
    description: 'Pieza de gres cerámico modelada a mano con acabado mate y textura mineral. Ideal para flores secas o como objeto decorativo central.',
    category: 'Cerámica & Deco',
    imageUrl: SVG_CERAMIC_VASE,
    inStock: true,
    featured: true,
    badge: 'Más Vendido',
  },
  {
    id: 'prod-2',
    name: 'Camisa Oversize de Lino Puro',
    price: 52000,
    originalPrice: 58000,
    description: 'Camisa unixes confeccionada en 100% lino orgánico prelavado. Textura ultra suave, corte relajado y botones de coco natural.',
    category: 'Textiles',
    imageUrl: SVG_LINEN_SHIRT,
    inStock: true,
    featured: true,
    badge: 'Nuevo',
  },
  {
    id: 'prod-3',
    name: 'Vela de Soja Botánica Ámbar',
    price: 19500,
    description: 'Cera 100% de soja vegetal con pabilo de algodón orgánico. Esencias puras de sándalo, cedro y notas cítricas de bergamota. 60hs de quemado limpio.',
    category: 'Aromas & Velas',
    imageUrl: SVG_SOY_CANDLE,
    inStock: true,
    featured: true,
    badge: 'Destacado',
  },
  {
    id: 'prod-4',
    name: 'Bolso Tote Bag Cuero Genuino',
    price: 84000,
    originalPrice: 96000,
    description: 'Confeccionado en cuero vacuno con curtido vegetal sin químicos agresivos. Amplio compartimento principal con bolsillo interno para laptop.',
    category: 'Accesorios',
    imageUrl: SVG_LEATHER_TOTE,
    inStock: true,
    featured: true,
    badge: '3 Cuotas Sin Interés',
  },
  {
    id: 'prod-5',
    name: 'Taza Artesanal Caliza',
    price: 16800,
    description: 'Taza de cerámica artesanal con esmalte reactivo salpicado. Cómoda asa ergonómica y retención térmica superior para café de especialidad o té.',
    category: 'Cerámica & Deco',
    imageUrl: SVG_CERAMIC_CUP,
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-6',
    name: 'Difusor de Ambientes Bosque Verde',
    price: 24500,
    description: 'Frasco de vidrio ámbar reciclado con varillas de ratán natural de alta absorción. Notas olfativas frescas de eucalipto, romero silvestre y salvia.',
    category: 'Aromas & Velas',
    imageUrl: SVG_AROMA_DIFFUSER,
    inStock: true,
    featured: false,
    badge: 'Eco Friendly',
  },
];
