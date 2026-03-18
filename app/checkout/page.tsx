"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  User,
  Check,
  ShoppingBag,
  Loader2,
  Package,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";

type Step = "contact" | "shipping" | "payment";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface OrderResult {
  id: string;
  total: number;
  estimatedDelivery: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("contact");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 15000 ? 0 : 1500;
  const total = subtotal + shipping;

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: "contact", label: "Contacto", icon: <User size={18} /> },
    { id: "shipping", label: "Envio", icon: <Truck size={18} /> },
    { id: "payment", label: "Pago", icon: <CreditCard size={18} /> },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setFormData({ ...formData, [name]: formatted.slice(0, 19) });
      return;
    }
    
    // Format expiry date
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 2) {
        setFormData({ ...formData, [name]: `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}` });
      } else {
        setFormData({ ...formData, [name]: cleaned });
      }
      return;
    }
    
    // Limit CVV
    if (name === "cvv") {
      setFormData({ ...formData, [name]: value.slice(0, 4) });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateStep = (step: Step): boolean => {
    const newErrors: string[] = [];

    if (step === "contact") {
      if (!formData.firstName.trim()) newErrors.push("Nombre es requerido");
      if (!formData.lastName.trim()) newErrors.push("Apellido es requerido");
      if (!formData.email.includes("@")) newErrors.push("Email invalido");
      if (!formData.phone.trim()) newErrors.push("Telefono es requerido");
    }

    if (step === "shipping") {
      if (!formData.address.trim()) newErrors.push("Direccion es requerida");
      if (!formData.city.trim()) newErrors.push("Ciudad es requerida");
      if (!formData.postalCode.trim()) newErrors.push("Codigo postal es requerido");
      if (!formData.province.trim()) newErrors.push("Provincia es requerida");
    }

    if (step === "payment") {
      if (formData.cardNumber.replace(/\s/g, "").length < 16) newErrors.push("Numero de tarjeta invalido");
      if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) newErrors.push("Fecha invalida (MM/YY)");
      if (formData.cvv.length < 3) newErrors.push("CVV invalido");
      if (!formData.cardName.trim()) newErrors.push("Nombre en tarjeta requerido");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === "contact") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("payment");
  };

  const handleBack = () => {
    if (currentStep === "shipping") setCurrentStep("contact");
    else if (currentStep === "payment") setCurrentStep("shipping");
  };

  const handleSubmit = async () => {
    if (!validateStep("payment")) return;

    setIsProcessing(true);
    setErrors([]);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            product: {
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
            },
            quantity: item.quantity,
          })),
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          shipping: {
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            province: formData.province,
          },
          payment: {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            cardName: formData.cardName,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOrderResult({
          id: data.order.id,
          total: data.order.total,
          estimatedDelivery: data.order.estimatedDelivery,
        });
        setOrderComplete(true);
        clearCart();
      } else {
        setErrors(data.errors || ["Error procesando el pedido"]);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setErrors(["Error de conexion. Intenta nuevamente."]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Order complete screen
  if (orderComplete && orderResult) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-3">
              Pedido Confirmado
            </h1>
            <p className="text-muted-foreground mb-8">
              Gracias por tu compra. Hemos enviado la confirmacion a tu email.
            </p>

            <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Package className="text-primary" size={24} />
                <span className="font-medium text-foreground">
                  Orden #{orderResult.id}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total pagado</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(orderResult.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entrega estimada</span>
                  <span className="text-foreground">
                    {new Date(orderResult.estimatedDelivery).toLocaleDateString("es-AR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <ShoppingBag size={64} className="text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-foreground mb-3">
            Tu carrito esta vacio
          </h1>
          <p className="text-muted-foreground mb-6">
            Agrega productos para continuar con la compra
          </p>
          <Link
            href="/#tienda"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={18} />
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Volver</span>
          </Link>
          <h1 className="font-serif text-xl text-foreground">Checkout</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Form Section */}
          <div>
            {/* Steps indicator */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => {
                      const currentIndex = steps.findIndex((s) => s.id === currentStep);
                      if (index < currentIndex) {
                        setCurrentStep(step.id);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : steps.findIndex((s) => s.id === currentStep) > index
                        ? "bg-green-500/10 text-green-500"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {steps.findIndex((s) => s.id === currentStep) > index ? (
                      <Check size={18} />
                    ) : (
                      step.icon
                    )}
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-border mx-2" />
                  )}
                </div>
              ))}
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <ul className="text-sm text-red-500 space-y-1">
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Form */}
            {currentStep === "contact" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">
                  Informacion de Contacto
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Juan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Perez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="juan@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Form */}
            {currentStep === "shipping" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">
                  Direccion de Envio
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Direccion
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Av. Corrientes 1234, Piso 5, Depto A"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Buenos Aires"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Codigo Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="C1000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Provincia
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Selecciona una provincia</option>
                      <option value="buenos-aires">Buenos Aires</option>
                      <option value="caba">CABA</option>
                      <option value="cordoba">Cordoba</option>
                      <option value="santa-fe">Santa Fe</option>
                      <option value="mendoza">Mendoza</option>
                      <option value="tucuman">Tucuman</option>
                      <option value="otro">Otra</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Form */}
            {currentStep === "payment" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">
                  Metodo de Pago
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Numero de Tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="JUAN PEREZ"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Este es un checkout de demostracion. No se procesaran pagos reales.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              {currentStep !== "contact" && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors"
                >
                  Atras
                </button>
              )}
              {currentStep !== "payment" ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>Pagar {formatPrice(total)}</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl text-foreground mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.product.weight}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envio</span>
                  <span className="text-foreground">
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-500">
                    Envio gratis en compras mayores a $15.000
                  </p>
                )}
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
