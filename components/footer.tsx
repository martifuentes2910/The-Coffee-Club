import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer id="contacto" className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.svg"
              alt="The Coffee Club"
              width={120}
              height={50}
              className="h-12 w-auto brightness-110 mb-6"
            />
            <p className="text-foreground/60 text-sm leading-relaxed">
              Cafe de especialidad tostado artesanalmente desde 1988.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 tracking-wider uppercase text-sm">
              Navegacion
            </h4>
            <ul className="space-y-3">
              {["Nosotros", "Menu", "Tienda", "Contacto"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 tracking-wider uppercase text-sm">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:reservas.coffeeclub@gmail.com"
                  className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Mail size={16} />
                  reservas.coffeeclub@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:011-987-5653"
                  className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Phone size={16} />
                  011-987-5653
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-foreground/60 text-sm">
                  <MapPin size={16} />
                  Buenos Aires, Argentina
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 tracking-wider uppercase text-sm">
              Siguenos
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-foreground/40 text-sm">
            &copy; {new Date().getFullYear()} The Coffee Club. Todos los derechos
            reservados.
          </p>
          <p className="text-foreground/30 text-xs mt-2">
            Made with love by Marti
          </p>
        </div>
      </div>
    </footer>
  );
}
