import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Mengimpor gambar hero2 dari folder assets sesuai petunjuk
import heroImage from '../assets/hero2.jpg'; 

export const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textDescRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.4 }
    )
      .fromTo(
        metaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.8'
      )
      .fromTo(
        imageWrapperRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 },
        '-=0.8'
      )
      .fromTo(
        textDescRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=1'
      );
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col justify-between bg-white text-neutral-900">
      {/* Top Header Section */}
      <div>
        <h1
          ref={titleRef}
          className="font-['Plus_Jakarta_Sans'] text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-neutral-950 mb-8 leading-[0.95]"
        >
          Shadows of Silence
        </h1>

        {/* Metadata Bar (Khas Gaya Portfolio Minimalis) */}
        <div
          ref={metaRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-neutral-200 text-xs font-mono uppercase text-neutral-500 mb-10"
        >
          <div>
            <span className="block text-neutral-400 mb-1">Captured In:</span>
            <p className="text-neutral-900 font-medium">Spring 2026, Tokyo</p>
          </div>
          <div>
            <span className="block text-neutral-400 mb-1">Series Type:</span>
            <p className="text-neutral-900 font-medium">Visual Diary Vol. 01</p>
          </div>
          <div>
            <span className="block text-neutral-400 mb-1">Camera & Film:</span>
            <p className="text-neutral-900 font-medium">Leica M11 + Portra 400</p>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 text-neutral-900 hover:underline tracking-widest font-semibold"
            >
              PURCHASE PRINTS →
            </a>
          </div>
        </div>
      </div>

      {/* Main Visual Display (Hero Image Container) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end my-4">
        {/* Main Image Frame */}
        <div
          ref={imageWrapperRef}
          className="md:col-span-8 overflow-hidden rounded-sm bg-neutral-100 shadow-sm"
        >
          <img
            src={heroImage}
            alt="Hero Exhibition"
            className="w-full h-[55vh] md:h-[65vh] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Side Text / Caption Column */}
        <div
          ref={textDescRef}
          className="md:col-span-4 flex flex-col justify-between h-full space-y-6 md:pl-6"
        >
          <div className="font-mono text-3xl md:text-5xl font-light text-neutral-300">
            01 /
          </div>
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold mb-3 tracking-tight text-neutral-900">
              Monochrome Perspectives
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed font-sans">
              A curated visual narrative capturing quiet urban spaces, subtle light dynamics, and raw unfiltered moments. Every frame preserves a fragment of time that would otherwise fade into memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};