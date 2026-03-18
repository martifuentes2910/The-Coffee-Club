"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="#nosotros"
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              NOSOTROS
            </Link>
            <Link
              href="#menu"
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              MENU
            </Link>
          </div>

          {/* Logo - Center */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="The Coffee Club"
              width={140}
              height={60}
              className="h-14 w-auto brightness-110"
              priority
            />
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="#tienda"
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              TIENDA
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              CONTACTO
            </Link>
          </div>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-foreground/70 hover:text-foreground transition-colors group"
            aria-label="Abrir carrito"
          >
            <ShoppingBag
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col items-center gap-4 pt-4">
            <Link
              href="#nosotros"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              NOSOTROS
            </Link>
            <Link
              href="#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              MENU
            </Link>
            <Link
              href="#tienda"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              TIENDA
            </Link>
            <Link
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium tracking-wider text-foreground/70 hover:text-primary transition-colors"
            >
              CONTACTO
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
