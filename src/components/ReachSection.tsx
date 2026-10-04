import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import handImg from '../assets/hand2.png';
import effect1Img from '../assets/effect1.png';
import effect2Img from '../assets/effect2.png';

gsap.registerPlugin(ScrollTrigger);

export default function ReachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLImageElement>(null);
  const effect1Ref = useRef<HTMLImageElement>(null);
  const effect2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.fromTo(
        handRef.current,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      tl.fromTo(
        effect1Ref.current,
        { x: -60, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 0.8, scale: 1, ease: 'none' },
        0.15
      );

      tl.fromTo(
        effect2Ref.current,
        { x: 60, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 0.8, scale: 1, ease: 'none' },
        0.3
      );

      tl.to(
        [handRef.current, effect1Ref.current, effect2Ref.current],
        { opacity: 0, y: 60, ease: 'none' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[180vh] bg-[var(--color-cream)] overflow-hidden mt-20 sm:mt-32 md:mt-40"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-cream)_100%)]" />

        <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center">
          {/* efek kiri */}
          <img
            ref={effect1Ref}
            src={effect1Img}
            alt=""
            className="absolute left-[5%] sm:left-[10%] top-1/3 w-32 sm:w-40 md:w-52 object-contain opacity-0"
          />

          {/* tangan di tengah */}
          <img
            ref={handRef}
            src={handImg}
            alt=""
            className="relative z-10 w-64 sm:w-80 md:w-[28rem] max-h-[70vh] object-contain opacity-0"
          />

          {/* efek kanan */}
          <img
            ref={effect2Ref}
            src={effect2Img}
            alt=""
            className="absolute right-[5%] sm:right-[10%] top-1/3 w-32 sm:w-40 md:w-52 object-contain opacity-0"
          />
        </div>
      </div>
    </section>
  );
}