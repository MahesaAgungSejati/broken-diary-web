import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getMakanans } from '../services/makananService';
import { getImageUrl } from '../services/supabase';
import type { Makanan } from '../types';

interface FoodPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: string; // Variasi aspek rasio foto (sama seperti di RandomPage)
}

// daftar rasio sama persis seperti versi hardcode sebelumnya, di-cycle per index
// supaya variasi masonry grid tetap terjaga walau data dari API
const ASPECT_PATTERNS = [
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[16/9]',
  'aspect-[2/3]',
  'aspect-[3/4]',
  'aspect-[1/1]',
  'aspect-[16/10]',
  'aspect-[16/9]',
  'aspect-[4/5]',
  'aspect-[1/1]',
  'aspect-[3/4]',
  'aspect-[3/4]',
  'aspect-[16/10]',
  'aspect-[2/3]',
  'aspect-[4/5]',
];

const ITEMS_PER_PAGE = 16;

const buildFoodPhotos = (makanans: Makanan[]): FoodPhoto[] =>
  makanans.map((makanan, idx) => ({
    id: String(makanan.id),
    title: makanan.nama,
    category: makanan.lokasi || '',
    image: getImageUrl(makanan.foto),
    aspectRatio: ASPECT_PATTERNS[idx % ASPECT_PATTERNS.length],
  }));

export const FoodPage: React.FC = () => {
  const [makanans, setMakanans] = useState<Makanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMakanans()
      .then(setMakanans)
      .catch((err) => console.error('Gagal ambil data makanan:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(makanans.length / ITEMS_PER_PAGE));

  const paginatedMakanans = makanans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const foodPhotos = buildFoodPhotos(paginatedMakanans);

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
            02 / Culinary & Gastronomy Archive
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-6">
            Food & Culinary
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-xs">
            <div>
              <span className="block text-neutral-400 uppercase">Archive Scope:</span>
              <span className="font-semibold text-neutral-900">Gastronomy & Culinary Art</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Total Entries:</span>
              <span className="font-semibold text-neutral-900">{makanans.length} Shots</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Display Mode:</span>
              <span className="font-semibold text-neutral-900">Masonry Grid</span>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <p className="text-center text-neutral-400 font-mono text-sm py-20">Loading...</p>
        )}

        {/* Pinterest/Masonry Layout (Sama persis dengan RandomPage) */}
        {!loading && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {foodPhotos.map((photo) => (
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
        )}

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