import { Coffee, Leaf, Award } from "lucide-react";

const features = [
  {
    icon: Coffee,
    title: "Tostado Artesanal",
    description:
      "Cada lote es tostado a mano en pequenas cantidades para garantizar frescura y sabor optimo.",
  },
  {
    icon: Leaf,
    title: "Origen Directo",
    description:
      "Trabajamos directamente con productores en Kenya, Ethiopia, Colombia y Guatemala.",
  },
  {
    icon: Award,
    title: "Cafe de Especialidad",
    description:
      "Solo seleccionamos granos con puntuacion superior a 85 en la escala SCA.",
  },
];

export function About() {
  return (
    <section id="nosotros" className="py-24 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            Nuestra Historia
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 text-balance">
            Pasion por el cafe desde hace mas de 35 anos
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Desde nuestros humildes comienzos en Buenos Aires, hemos dedicado
            nuestra vida a encontrar y tostar los mejores cafes del mundo.
            Cada taza cuenta una historia de dedicacion, tradicion y amor por
            este noble grano.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
