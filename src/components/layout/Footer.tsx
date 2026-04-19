import Link from 'next/link';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const brandLinks = [
  { name: 'Volvo', href: '/urunler?brand=volvo' },
  { name: 'Komatsu', href: '/urunler?brand=komatsu' },
  { name: 'Caterpillar', href: '/urunler?brand=caterpillar' },
  { name: 'Hidromek', href: '/urunler?brand=hidromek' },
  { name: 'John Deere', href: '/urunler?brand=john-deere' },
  { name: 'Champion', href: '/urunler?brand=champion' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Garanti İş Makineleri</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Türkiye&apos;nin güvenilir iş makinesi yedek parça tedarikçisi. 
              Orijinal ve muadil yedek parçalarda kaliteli çözümler sunuyoruz.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#0057A8] rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#0057A8] rounded-lg flex items-center justify-center transition-colors" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#0057A8] rounded-lg flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-colors" aria-label="WhatsApp">
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Markalar</h4>
            <ul className="space-y-2">
              {brandLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/urunler" className="text-sm text-gray-400 hover:text-white transition-colors">Tüm Ürünler</Link></li>
              <li><Link href="/hakkimizda" className="text-sm text-gray-400 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="text-sm text-gray-400 hover:text-white transition-colors">İletişim</Link></li>
              <li><Link href="/gizlilik-politikasi" className="text-sm text-gray-400 hover:text-white transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kvkk-aydinlatma-metni" className="text-sm text-gray-400 hover:text-white transition-colors">KVKK Aydınlatma Metni</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#F5A800]" />
                <span className="text-sm text-gray-400">Ankara, Türkiye</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 shrink-0 text-[#F5A800]" />
                <a href="tel:+903121234567" className="text-sm text-gray-400 hover:text-white transition-colors">+90 (312) 123 45 67</a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 shrink-0 text-[#F5A800]" />
                <a href="mailto:info@garantiismakineleri.com" className="text-sm text-gray-400 hover:text-white transition-colors">info@garantiismakineleri.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="w-4 h-4 shrink-0 text-[#25D366]" />
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">WhatsApp İletişim</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {currentYear} Garanti İş Makineleri Tic. ve San. Ltd. Şti. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/gizlilik-politikasi" className="hover:text-gray-300 transition-colors">Gizlilik</Link>
            <Link href="/kvkk-aydinlatma-metni" className="hover:text-gray-300 transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
