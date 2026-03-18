import { NextRequest, NextResponse } from "next/server";

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface CheckoutRequest {
  items: CartItem[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    province: string;
  };
  payment: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
  };
}

function validateCheckoutData(data: CheckoutRequest): string[] {
  const errors: string[] = [];

  // Validate items
  if (!data.items || data.items.length === 0) {
    errors.push("El carrito esta vacio");
  }

  // Validate customer
  if (!data.customer.firstName?.trim()) errors.push("Nombre es requerido");
  if (!data.customer.lastName?.trim()) errors.push("Apellido es requerido");
  if (!data.customer.email?.includes("@")) errors.push("Email invalido");
  if (!data.customer.phone?.trim()) errors.push("Telefono es requerido");

  // Validate shipping
  if (!data.shipping.address?.trim()) errors.push("Direccion es requerida");
  if (!data.shipping.city?.trim()) errors.push("Ciudad es requerida");
  if (!data.shipping.postalCode?.trim()) errors.push("Codigo postal es requerido");
  if (!data.shipping.province?.trim()) errors.push("Provincia es requerida");

  // Validate payment (basic validation for demo)
  if (!data.payment.cardNumber || data.payment.cardNumber.replace(/\s/g, "").length < 16) {
    errors.push("Numero de tarjeta invalido");
  }
  if (!data.payment.expiryDate?.match(/^\d{2}\/\d{2}$/)) {
    errors.push("Fecha de vencimiento invalida (MM/YY)");
  }
  if (!data.payment.cvv || data.payment.cvv.length < 3) {
    errors.push("CVV invalido");
  }
  if (!data.payment.cardName?.trim()) {
    errors.push("Nombre en tarjeta es requerido");
  }

  return errors;
}

function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `TCC-${timestamp}-${randomPart}`.toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const data: CheckoutRequest = await request.json();

    // Validate data
    const errors = validateCheckoutData(data);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal > 15000 ? 0 : 1500;
    const total = subtotal + shipping;

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate order
    const order = {
      id: generateOrderId(),
      items: data.items,
      customer: data.customer,
      shipping: data.shipping,
      subtotal,
      shippingCost: shipping,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return NextResponse.json({
      success: true,
      order,
      message: "Pedido confirmado exitosamente",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, errors: ["Error procesando el pedido"] },
      { status: 500 }
    );
  }
}
