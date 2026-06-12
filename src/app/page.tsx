import Hero from "@/components/sections/Hero";
import ProductStory from "@/components/sections/ProductStory";
import Experience from "@/components/sections/Experience";
import Categories from "@/components/sections/Categories";
import Calculator from "@/components/sections/Calculator";
import Showcase from "@/components/sections/Showcase";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background">
      <Hero />
      <ProductStory />
      <Experience />
      <Categories />
      <Calculator />
      <Showcase />
      <Contact />
    </main>
  );
}
