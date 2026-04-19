import { Metadata } from 'next';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Garanti İş Makineleri iletişim bilgileri. Ankara merkezli iş makinesi yedek parça tedarikçisi.',
};

export default function ContactPage() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-[#0057A8] to-[#004080] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">İletişim</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Bizimle iletişime geçin. Yedek parça talepleriniz için 7/24 hizmetinizdeyiz.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">İletişim Bilgileri</h2>

            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0057A8]/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiMapPin className="w-6 h-6 text-[#0057A8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A2E] mb-1">Adres</h3>
                  <p className="text-[#6B7280]">
                    Garanti İş Makineleri Tic. ve San. Ltd. Şti.
                  </p>
                  <p className="text-[#6B7280]">Ankara, Türkiye</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0057A8]/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiPhone className="w-6 h-6 text-[#0057A8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A2E] mb-1">Telefon</h3>
                  <a href="tel:+903121234567" className="text-[#0057A8] hover:underline font-medium">
                    +90 (312) 123 45 67
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0057A8]/10 rounded-xl flex items-center justify-center shrink-0">
                  <FiMail className="w-6 h-6 text-[#0057A8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A2E] mb-1">E-posta</h3>
                  <a href="mailto:info@garantiismakineleri.com" className="text-[#0057A8] hover:underline font-medium">
                    info@garantiismakineleri.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#25D366]/10 rounded-xl p-6 border border-[#25D366]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center shrink-0">
                  <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A2E] mb-1">WhatsApp</h3>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors mt-2"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    WhatsApp ile İletişim
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Konum</h2>
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.26834609566!2d32.62269435!3d39.9035557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara%2C%20T%C3%BCrkiye!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Garanti İş Makineleri Konum"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
