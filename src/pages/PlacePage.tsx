import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getTempats } from '../services/tempatService';
import { getImageUrl } from '../services/supabase';
import type { Tempat } from '../types';

interface PlacePhoto {
  id: string;
  title: string;
  location: string;
  image: string;
  flexClass: string; // Rasio lebar flex per kartu (misal: flex-[5], flex-[4], flex-[3])
}

interface PhotoRow {
  rowId: number;
  items: PlacePhoto[];
}

// pola lebar kartu per baris, sama seperti versi sebelumnya (selang-seling)
const ROW_PATTERNS = [
  ['flex-[5]', 'flex-[4]', 'flex-[3]'],
  ['flex-[3]', 'flex-[4]', 'flex-[5]'],
];

const ITEMS_PER_PAGE = 12;

// susun data API jadi baris-baris 3 kartu, mengikuti pola lebar lama
const buildRows = (tempats: Tempat[]): PhotoRow[] => {
  const rows: PhotoRow[] = [];
  for (let i = 0; i < tempats.length; i += 3) {
    const rowIndex = i / 3;
    const pattern = ROW_PATTERNS[rowIndex % 2];
    const chunk = tempats.slice(i, i + 3);

    rows.push({
      rowId: rowIndex + 1,
      items: chunk.map((tempat, idx) => ({
        id: String(tempat.id),
        title: tempat.nama,
        location: tempat.lokasi || '',
        image: getImageUrl(tempat.foto),
        flexClass: pattern[idx] || 'flex-[4]',
      })),
    });
  }
  return rows;
};

export const PlacePage: React.FC = () => {
  const [tempats, setTempats] = useState<Tempat[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getTempats()
      .then(setTempats)
      .catch((err) => console.error('Gagal ambil data tempat:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(tempats.length / ITEMS_PER_PAGE));

  const paginatedTempats = tempats.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const placePhotoRows = buildRows(paginatedTempats);

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
            01 / Architectural & City Archive
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 mb-6">
            Places & Cities
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-xs">
            <div>
              <span className="block text-neutral-400 uppercase">Archive Scope:</span>
              <span className="font-semibold text-neutral-900">Global Landscapes & Urban</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Total Entries:</span>
              <span className="font-semibold text-neutral-900">{tempats.length} Shots</span>
            </div>
            <div>
              <span className="block text-neutral-400 uppercase">Display Mode:</span>
              <span className="font-semibold text-neutral-900">{ITEMS_PER_PAGE} Items / Page</span>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <p className="text-center text-neutral-400 font-mono text-sm py-20">Loading...</p>
        )}

        {/* Container Utama: Per Baris Dibuat Flexbox Sejajar Rata Atas-Bawah */}
        {!loading && (
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            {placePhotoRows.map((row) => (
              <div
                key={row.rowId}
                className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full h-auto md:h-64 sm:md:h-72 lg:h-80"
              >
                {row.items.map((photo) => (
                  <div
                    key={photo.id}
                    className={`${photo.flexClass} group relative w-full h-full overflow-hidden bg-neutral-900 rounded-none cursor-pointer`}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100 rounded-none"
                    />

                    {/* Hover Overlay Informasi (Sembunyi, tampil saat kursor diarahkan) */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white pointer-events-none">
                      <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                        {photo.location}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm sm:text-base">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                ))}
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