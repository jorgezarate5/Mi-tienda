import { CartItem, CustomerOrderDetails, Product, StoreConfig } from '../types/store';

/**
 * Limpia y normaliza el número de teléfono para la URL de WhatsApp.
 * Elimina espacios, guiones, símbolos '+' y paréntesis.
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Formatea un número como moneda local legible.
 * Ej: $38.500
 */
export function formatCurrency(amount: number, symbol: string = '$'): string {
  return `${symbol}${amount.toLocaleString('es-AR', {
    maximumFractionDigits: 0,
  })}`;
}

/**
 * Genera el mensaje y la URL directa de WhatsApp para finalizar el pedido del carrito.
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  config: StoreConfig,
  customerDetails?: CustomerOrderDetails
): string {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cleanPhone = cleanPhoneNumber(config.whatsappNumber);

  const lines: string[] = [];

  // Saludo y nombre de la tienda
  lines.push(`👋 *¡Hola ${config.storeName}!* Quisiera realizar el siguiente pedido:`);
  lines.push('');
  lines.push('🛒 *DETALLE DEL PEDIDO:*');

  // Listado de productos
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. *${item.product.name}*` +
        `\n   • Cantidad: ${item.quantity}` +
        `\n   • Subtotal: ${formatCurrency(itemTotal, config.currencySymbol)}`
    );
  });

  lines.push('');
  lines.push(`💰 *TOTAL A PAGAR:* ${formatCurrency(total, config.currencySymbol)}`);

  // Cuotas si aplica
  if (config.installmentsCount > 1) {
    const installmentVal = Math.round(total / config.installmentsCount);
    lines.push(`💳 (O hasta ${config.installmentsCount} cuotas de ${formatCurrency(installmentVal, config.currencySymbol)})`);
  }

  // Datos opcionales del cliente
  if (customerDetails && (customerDetails.customerName || customerDetails.address)) {
    lines.push('');
    lines.push('📋 *DATOS DE ENTREGA Y PAGO:*');
    if (customerDetails.customerName) {
      lines.push(`• *Nombre:* ${customerDetails.customerName}`);
    }
    if (customerDetails.customerPhone) {
      lines.push(`• *Teléfono de contacto:* ${customerDetails.customerPhone}`);
    }
    const deliveryLabel =
      customerDetails.deliveryType === 'shipping'
        ? 'Envío a domicilio'
        : 'Retiro en punto de entrega';
    lines.push(`• *Modalidad:* ${deliveryLabel}`);

    if (customerDetails.deliveryType === 'shipping' && customerDetails.address) {
      lines.push(`• *Dirección de entrega:* ${customerDetails.address}`);
    }

    const paymentLabels: Record<string, string> = {
      transfer: 'Transferencia bancaria / CBU / Alias',
      cash: 'Efectivo contra entrega',
      card_link: 'Link de pago / Tarjetas',
      to_agree: 'Acordar con el vendedor',
    };
    lines.push(`• *Medio de pago:* ${paymentLabels[customerDetails.paymentMethod] || 'A convenir'}`);

    if (customerDetails.notes && customerDetails.notes.trim()) {
      lines.push(`• *Notas:* ${customerDetails.notes.trim()}`);
    }
  }

  lines.push('');
  lines.push('¿Me confirmas disponibilidad y los datos para coordinar? ¡Muchas gracias!');

  const fullText = lines.join('\n');
  const encodedText = encodeURIComponent(fullText);

  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Genera la URL de WhatsApp para comprar directamente un único producto.
 */
export function generateWhatsAppDirectProductUrl(
  product: Product,
  quantity: number = 1,
  config: StoreConfig
): string {
  const total = product.price * quantity;
  const cleanPhone = cleanPhoneNumber(config.whatsappNumber);

  const lines = [
    `👋 *¡Hola ${config.storeName}!* Me interesa comprar directamente este producto:`,
    '',
    `📌 *Producto:* ${product.name}`,
    `🔢 *Cantidad:* ${quantity}`,
    `💰 *Total:* ${formatCurrency(total, config.currencySymbol)}`,
    '',
    '¿Tienen stock disponible para coordinar el pago y la entrega? ¡Gracias!',
  ];

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
}
