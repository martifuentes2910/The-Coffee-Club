"use client";

import { useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

export function Store() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="tienda" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            E-Shop
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 text-balance">
            Nuestra Seleccion
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Cafes de especialidad seleccionados de los mejores origenes del
            mundo, tostados frescos cada semana.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/60 text-lg">
              No hay productos en esta categoria todavia.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
