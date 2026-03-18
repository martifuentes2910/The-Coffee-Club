import Image from "next/image";
import { ArrowRight } from "lucide-react";

const menuItems = [
  {
    title: "Cafes",
    description:
      "Desde espressos intensos hasta filtrados delicados. Cada taza preparada con precision y cuidado por nuestros baristas.",
    image: "/images/menu-cafe.webp",
  },
  {
    title: "Almuerzos",
    description:
      "Platos frescos y nutritivos que complementan perfectamente tu cafe. Opciones vegetarianas y veganas disponibles.",
    image: "/images/menu-lunch.webp",
  },
  {
    title: "Postres",
    description:
      "Delicias artesanales horneadas diariamente. El acompanamiento perfecto para tu bebida favorita.",
    image: "/images/menu-dessert.webp",
  },
];

export function Menu() {
  return (
    <section id="menu" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/menu-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            Descubre
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 text-balance">
            Nuestro Menu
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto" />
        </div>

        {/* Menu Items */}
        <div className="space-y-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 group`}
            >
              {/* Image */}
              <div className="w-full lg:w-2/5 aspect-[4/3] relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 lg:p-12">
                <h3 className="font-serif text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  {item.description}
                </p>
                <button className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                  Ver opciones
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
