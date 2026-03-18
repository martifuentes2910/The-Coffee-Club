import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero2.webp"
          alt="Coffee Club ambiance"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
          Desde 1988
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6 text-balance leading-tight">
          Creamos fragancias que alegran tu dia
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Descubre nuestra seleccion de cafes de especialidad, tostados
          artesanalmente para resaltar los sabores unicos de cada origen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#tienda"
            className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
          >
            Explorar Tienda
          </Link>
          <Link
            href="#nosotros"
            className="px-8 py-4 border border-foreground/30 text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all"
          >
            Nuestra Historia
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link
          href="#nosotros"
          className="flex flex-col items-center gap-2 text-foreground/50 hover:text-primary transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={20} />
        </Link>
      </div>
    </section>
  );
}
