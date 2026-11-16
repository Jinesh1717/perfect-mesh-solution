'use client';

import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import MosquitoWindowScroll from '@/components/sections/MosquitoWindowScroll';
import ProductStory from '@/components/sections/ProductStory';
import Experience from '@/components/sections/Experience';
import Categories from '@/components/sections/Categories';
import Showcase from '@/components/sections/Showcase';
import InstallationProcess from '@/components/sections/InstallationProcess';
import Calculator from '@/components/sections/Calculator';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-full overflow-x-clip bg-[#070809] text-[#f4f4f5]">
      <Hero />
      <TrustBar />
      <MosquitoWindowScroll />
      <ProductStory />
      <Experience />
      <Categories />
      <Showcase />
      <InstallationProcess />
      <Calculator />
      <Contact />
      <Footer />
    </main>
  );
}
