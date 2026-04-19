'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'essential_only');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9997] bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-[#1A1A2E]">
            Bu web sitesi, deneyiminizi iyileştirmek için çerezler kullanmaktadır.{' '}
            <Link href="/gizlilik-politikasi" className="text-[#0057A8] hover:underline">
              Gizlilik Politikası
            </Link>{' '}
            ve{' '}
            <Link href="/kvkk-aydinlatma-metni" className="text-[#0057A8] hover:underline">
              KVKK Aydınlatma Metni
            </Link>{' '}
            sayfalarımızı inceleyebilirsiniz.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sadece Gerekli
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0057A8] hover:bg-[#004080] rounded-lg transition-colors"
          >
            Tümünü Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
