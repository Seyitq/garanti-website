'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-[9998] w-11 h-11 bg-[#0057A8] hover:bg-[#004080] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="Sayfanın başına dön"
    >
      <FiArrowUp className="w-5 h-5" />
    </button>
  );
}
