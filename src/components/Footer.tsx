import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-white text-neutral-900 border-t border-neutral-200 py-16 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-neutral-100">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <a
            href="#"
            className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold tracking-tighter text-neutral-900 uppercase block"
          >
            Broken Diary<span className="text-neutral-400">.</span>
          </a>
          <p className="text-neutral-500 text-sm max-w-sm font-sans leading-relaxed">
            A minimalist visual portfolio capturing unfiltered moments, architectural shadows, and everyday gastronomy.
          </p>
        </div>

        {/* Links Navigation */}
        <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span className="block text-neutral-400 font-semibold mb-2">Navigation</span>
          <a href="#works" className="block hover:text-black transition-colors">. Works</a>
          <a href="#about" className="block hover:text-black transition-colors">. About</a>
          <a href="#food" className="block hover:text-black transition-colors">. Culinary</a>
          <a href="#journal" className="block hover:text-black transition-colors">. Journal</a>
        </div>

        {/* Socials / Contact */}
        <div className="md:col-span-4 space-y-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span className="block text-neutral-400 font-semibold mb-2">Get in Touch</span>
          <p className="text-neutral-900 font-sans normal-case text-sm">hello@brokendiary.com</p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Unsplash</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Back To Top */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-8 font-mono text-xs text-neutral-400 gap-4">
        <p>© {new Date().getFullYear()} BROKEN DIARY. ALL RIGHTS RESERVED.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-black transition-colors uppercase tracking-widest"
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
};