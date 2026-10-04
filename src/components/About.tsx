import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
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
      id="about"
      className="w-full bg-white text-neutral-900 py-24 md:py-36 px-6 md:px-12 border-t border-neutral-100 max-w-[1800px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* Left Column: Sub-title / Section Indicator */}
        <div className="md:col-span-4 space-y-4">
          <div className="about-animate font-mono text-xs uppercase tracking-widest text-neutral-400">
            02 / About The Philosophy
          </div>
          <h2 className="about-animate font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-none">
            Why “Broken Diary”?
          </h2>
        </div>

        {/* Right Column: Statement & Main Description */}
        <div className="md:col-span-8 md:pl-8 space-y-8">
          <p className="about-animate font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl md:text-4xl font-normal leading-snug tracking-tight text-neutral-800">
            Because diaries are usually written on paper and contain stories about love, joy, and sadness...
          </p>

          <div className="about-animate grid grid-cols-1 sm:grid-cols-12 gap-6 pt-6 border-t border-neutral-200">
            <div className="sm:col-span-8">
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-sans">
                ...but here I’m sharing random photos of mine that sometimes don’t mean anything—just enjoy them.
              </p>
            </div>

            {/* Accent Metadata / Personal Note */}
            <div className="sm:col-span-4 flex flex-col justify-end font-mono text-xs text-neutral-400 uppercase tracking-widest space-y-1">
              <span>Unfiltered Moments</span>
              <span>No Narrative Needed</span>
              <span className="text-neutral-900 font-medium">© Broken Diary</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};