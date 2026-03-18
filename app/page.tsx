import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Menu } from "@/components/menu";
import { Store } from "@/components/store";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <CartDrawer />
      <Hero />
      <About />
      <Menu />
      <Store />
      <Footer />
    </main>
  );
}
