import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RandomPhoto {
  id: string;
  title: string;
  image: string;
  aspectRatio: string; // Ukuran bervariasi agar terkesan acak
}

const randomPhotos: RandomPhoto[] = [
  {
    id: '01',
    title: 'Hangout Time',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: '02',
    title: 'Cafe Talks',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: '03',
    title: 'Graduation Day',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[1/1]',
  },
  {
    id: '04',
    title: 'Street Storefront',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '05',
    title: 'Behind the Lens',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[2/3]',
  },
  {
    id: '06',
    title: 'Sandy Trails',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/5]',
  },
  {
    id: '07',
    title: 'Nature Walk',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: '08',
    title: 'Ancient Archway',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[1/1]',
  },
  {
    id: '09',
    title: 'Culture',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: '10',
    title: 'Night Sky & Milky Way',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    id: '11',
    title: 'Celebration',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: '12',
    title: 'Friends Together',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/10]',
  },
];

export const RandomGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.random-card',
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journal"
      className="w-full bg-white text-neutral-900 py-24 px-6 md:px-12 max-w-[1800px] mx-auto border-t border-neutral-100 select-none"
    >
      {/* Header Section */}
      <div className="space-y-6 mb-16 text-center max-w-3xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          04 / Unfiltered Archives
        </div>
        <h2 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950">
          ...and Many Random Pictures
        </h2>
        <p className="text-neutral-500 text-sm md:text-base font-sans leading-relaxed">
          A collage of spontaneous moments, candid smiles, starry nights, and everyday snapshots that don't need a specific narrative—just raw memories preserved in time.
        </p>
      </div>

      {/* Masonry Layout: Ukuran Acak Bervariasi & Rapat Penuh Ke Kanan */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6 w-full">
        {randomPhotos.map((photo) => (
          <div
            key={photo.id}
            className="random-card break-inside-avoid group relative overflow-hidden rounded-sm bg-neutral-100 shadow-sm cursor-pointer"
          >
            <div className={`w-full ${photo.aspectRatio} overflow-hidden`}>
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-mono text-xs text-white tracking-wider font-medium">
                {photo.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};