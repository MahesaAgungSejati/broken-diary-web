import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Gallery } from '../components/Gallery';
import { FoodGallery } from '../components/FoodGallery';
import { RandomGallery } from '../components/RandomGallery';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />       {/* City / Places */}
        <FoodGallery />   {/* Culinary */}
        <RandomGallery /> {/* Random Pictures */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;