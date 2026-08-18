import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Categories from "@/components/sections/categories/Categories";
import Products from "@/components/sections/products/Products";
import WhyChooseUs from "@/components/sections/why-choose-us/WhyChooseUs";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import Contact from "@/components/sections/contact/Contact";
import CtaBand from "@/components/sections/cta/CtaBand";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Categories />
      <Products />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <CtaBand />
    </main>
  );
}
