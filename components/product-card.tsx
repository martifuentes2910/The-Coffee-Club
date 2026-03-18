"use client";

import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Product, useCartStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);

    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 600);
  };

  const roastLevelMap = {
    light: "Tueste Claro",
    medium: "Tueste Medio",
    dark: "Tueste Oscuro",
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.origin && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
            {product.origin}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-semibold text-primary whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Details */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {product.roastLevel && (
            <span className="px-2 py-1 bg-secondary rounded-md text-xs text-foreground/70">
              {roastLevelMap[product.roastLevel]}
            </span>
          )}
          {product.weight && (
            <span className="px-2 py-1 bg-secondary rounded-md text-xs text-foreground/70">
              {product.weight}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={cn(
            "w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300",
            product.inStock
              ? isAdding
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {isAdding ? (
            <>
              <Check size={18} />
              Agregado
            </>
          ) : product.inStock ? (
            <>
              <ShoppingBag size={18} />
              Agregar al Carrito
            </>
          ) : (
            "Agotado"
          )}
        </button>
      </div>
    </div>
  );
}
