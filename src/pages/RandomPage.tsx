import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface RandomPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: string; // Mengontrol variasi tinggi foto (potret, lanskap, persegi)
}

const randomPhotosPage1: RandomPhoto[] = [
  // Kolom 1 - Variasi Aspek Rasio
  {
    id: '01',
    title: 'Yellow Ambient',
    category: 'Portrait',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: '02',
    title: 'Sunlit Moment',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: '03',
    title: 'Urban Shadow',
    category: 'Street Photography',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: '04',
    title: 'Monochrome City',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
  },

  // Kolom 2
  {
    id: '05',
    title: 'Veiled Portrait',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[2/3]',
  },
  {
    id: '06',
    title: 'Classic Expression',
    category: 'Studio',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: '07',
    title: 'Movement & Grace',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[1/1]',
  },
  {
    id: '08',
    title: 'Distant Horizon',
    category: 'Landscape',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/10]',
  },

  // Kolom 3
  {
    id: '09',
    title: 'Warm Embrace',
    category: 'Candid',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    id: '10',
    title: 'Coastal Chill',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: '11',
    title: 'Shadow Contour',
    category: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[1/1]',
  },
  {
    id: '12',
    title: 'Stairway Stories',
    category: 'Documentary',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
  },

  // Kolom 4
  {
    id: '13',
    title: 'Denim Vibe',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: '14',
    title: 'Indoor Quiet',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '15',
    title: 'Casual Elegance',
    category: 'Portrait',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[2/3]',
  },
  {
    id: '16',
    title: 'Golden Gaze',
    category: 'Street',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    aspectRatio: 'aspect-[4/5]',
  },
];

export const RandomPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased flex flex-col justify-between">
      <Navbar />

      <main className="w-full pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-[1800px] mx-auto flex-grow">
        {/* Header Section */}
        <div className="mb-10 border-b border-neutral-200 pb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
            03 / Unfiltered & Experimental Archive
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-6">
            Random Shots
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-xs">
            <div>
              <span className="block text-neutral-400 uppercase">Archive Scope:</span>
              <span className="font-semibold text-neutral-900">Miscellaneous & Candid</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Total Entries:</span>
              <span className="font-semibold text-neutral-900">32 Shots</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Display Mode:</span>
              <span className="font-semibold text-neutral-900">Masonry Grid</span>
            </div>
          </div>
        </div>

        {/* Pinterest Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {randomPhotosPage1.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid group relative overflow-hidden bg-neutral-900 rounded-none cursor-pointer"
            >
              <div className={`w-full ${photo.aspectRatio}`}>
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100 rounded-none"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white pointer-events-none">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                  {photo.category}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm sm:text-base">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-16 flex items-center justify-center gap-3 font-mono text-xs">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-neutral-300 rounded-none disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
          >
            ← PREV
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-9 h-9 border rounded-none transition-colors ${
                  currentPage === pageNum
                    ? 'bg-black text-white border-black'
                    : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-neutral-300 rounded-none disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
          >
            NEXT →
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};