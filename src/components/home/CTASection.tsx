import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function CTASection() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#0057A8] to-[#004080]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Aradığınız Parçayı Bulamadınız mı?
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-base md:text-lg">
          Uzman ekibimiz size özel çözüm sunmak için hazır.
          WhatsApp üzerinden veya telefon ile bize ulaşın.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-6 py-3.5 rounded-lg text-base transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
            WhatsApp ile Yazın
          </a>
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/30 px-6 py-3.5 rounded-lg text-base transition-colors"
          >
            Tüm Ürünleri Görün
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
