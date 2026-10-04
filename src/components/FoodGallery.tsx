import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FoodItem {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  colSpan: string; // Mengatur variasi ukuran grid
}

const foodData: FoodItem[] = [
  {
    id: '01',
    title: 'Artisanal Sourdough & Fresh Butter',
    category: 'Bakery & Pastry',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    location: 'Morning Bakery, Tokyo',
    colSpan: 'md:col-span-7',
  },
  {
    id: '02',
    title: 'Pour-Over Ethiopian Roast',
    category: 'Coffee Culture',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    location: 'Shibuya Roastery',
    colSpan: 'md:col-span-5',
  },
  {
    id: '03',
    title: 'Minimalist Chef Tasting Menu',
    category: 'Fine Dining',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    location: 'Ginza District',
    colSpan: 'md:col-span-5',
  },
  {
    id: '04',
    title: 'Handcrafted Ramen in Rich Broth',
    category: 'Street Comfort Food',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop',
    location: 'Alleyway Yatai',
    colSpan: 'md:col-span-7',
  },
];

export const FoodGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered reveal animation untuk foto-foto kuliner
      gsap.fromTo(
        '.food-animate',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="food"
      className="w-full bg-white text-neutral-900 py-24 px-6 md:px-12 max-w-[1800px] mx-auto border-t border-neutral-100 select-none"
    >
      {/* Section Header & Metadata */}
      <div className="space-y-6 mb-16">
        <div className="food-animate font-mono text-xs uppercase tracking-widest text-neutral-400">
          03 / Culinary Series
        </div>
        <h2 className="food-animate font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950">
          Flavors & Still Life
        </h2>

        {/* Metadata Specs Bar */}
        <div className="food-animate grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-neutral-200 text-xs font-mono uppercase text-neutral-500">
          <div>
            <span className="block text-neutral-400 mb-0.5">Category:</span>
            <p className="text-neutral-900 font-medium">Gastronomy & Micro Moments</p>
          </div>
          <div>
            <span className="block text-neutral-400 mb-0.5">Focus:</span>
            <p className="text-neutral-900 font-medium">Texture, Light & Mood</p>
          </div>
          <div>
            <span className="block text-neutral-400 mb-0.5">Camera Specs:</span>
            <p className="text-neutral-900 font-medium">Leica M11 + Summilux 35mm</p>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <span className="text-neutral-900 font-semibold tracking-widest">
              VOL. 02 — FOOD
            </span>
          </div>
        </div>
      </div>

      {/* Asymmetric Food Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        {foodData.map((item) => (
          <div
            key={item.id}
            className={`food-animate ${item.colSpan} group cursor-pointer`}
          >
            {/* Image Frame dengan Hover Zoom & Dark Overlay Halus */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-neutral-100 rounded-sm mb-4 shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              
              {/* Category Pill Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider text-neutral-800 shadow-sm">
                {item.category}
              </div>
            </div>

            {/* Photo Caption */}
            <div className="flex justify-between items-start pt-1 font-mono text-xs">
              <div>
                <span className="text-neutral-400 block mb-0.5">{item.id} /</span>
                <p className="text-neutral-900 font-medium text-base font-sans tracking-tight group-hover:underline">
                  {item.title}
                </p>
              </div>
              <span className="text-neutral-400 text-[11px] mt-1">{item.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Narrative / Food Philosophy */}
      <div className="food-animate grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-16 pt-8 border-t border-neutral-100">
        <div className="md:col-span-4">
          <div className="font-mono text-3xl md:text-5xl font-light text-neutral-300 mb-1">
            02 /
          </div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-tight text-neutral-950">
            Taste in Stillness
          </h3>
        </div>

        <div className="md:col-span-8 md:pl-8">
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-sans max-w-3xl">
            Food is more than sustenance—it is a visual ritual of textures, steam, and intimate spaces. This collection explores quiet cafes, bustling street kitchens, and simple, unpretentious dishes captured exactly as they were presented, honoring the atmosphere of every bite.
          </p>
        </div>
      </div>
    </section>
  );
};