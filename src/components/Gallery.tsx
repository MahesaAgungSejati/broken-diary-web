import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

interface CityPhoto {
  id: string;
  title: string;
  location: string;
  image: string;
}

const cityPhotos: CityPhoto[] = [
  {
    id: '01',
    title: 'Red Striped Canopy',
    location: 'Palermo, Sicily',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'Twin Green Awning',
    location: 'Catania, Sicily',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '03',
    title: 'Orange Dome Shade',
    location: 'Siracusa, Sicily',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '04',
    title: 'Green Storefront',
    location: 'Taormina, Sicily',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '05',
    title: 'Minimal Archways',
    location: 'Noto, Sicily',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '06',
    title: 'Pastel Street',
    location: 'Trapani, Sicily',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800&auto=format&fit=crop',
  },
];

export const Gallery: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="place" className="w-full bg-white text-neutral-900 py-20 px-6 md:px-12 max-w-[1800px] mx-auto select-none">
      {/* Title & Metadata Header */}
      <div className="mb-8">
        <h2 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-6">
          Shadows of Sicily
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-neutral-200 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-xs">
            <div>
              <span className="block text-neutral-400 uppercase">Captured In:</span>
              <span className="font-semibold text-neutral-900">Spring 2024, Sicily</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Series Type:</span>
              <span className="font-semibold text-neutral-900">Ongoing Field Study</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Camera & Film:</span>
              <span className="font-semibold text-neutral-900">Fuji GFX 100S + Portra 400</span>
            </div>
          </div>

          {/* Tombol Panah Navigasi Slider */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-all"
              aria-label="Previous Slide"
            >
              ←
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-all"
              aria-label="Next Slide"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Swiper Slider 4 Card Rapi */}
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="w-full"
      >
        {cityPhotos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <div className="group relative overflow-hidden bg-neutral-100 rounded-sm cursor-pointer">
              <div className="w-full aspect-[3/4] overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-3 bg-white border-t border-neutral-100 flex justify-between items-center font-mono text-xs">
                <span className="font-medium text-neutral-900">{photo.title}</span>
                <span className="text-neutral-400">{photo.location}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};