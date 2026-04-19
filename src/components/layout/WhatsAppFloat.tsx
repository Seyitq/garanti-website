'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function WhatsAppFloat() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 wa-pulse"
      aria-label="WhatsApp ile iletişim"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}
