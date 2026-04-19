import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0057A8] via-[#004080] to-[#1A1A2E] text-white overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-[#F5A800] rounded-full animate-pulse" />
            <span className="text-sm text-white/90">20+ Yıllık Sektör Deneyimi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Türkiye&apos;nin Güvenilir{' '}
            <span className="text-[#F5A800]">İş Makinesi</span>{' '}
            Yedek Parça Tedarikçisi
          </h1>

          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
            Volvo, Komatsu, Caterpillar, Hidromek, John Deere ve Champion markalarında
            orijinal ve muadil yedek parçalar. Hızlı teslimat, uzman destek.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/urunler"
              className="inline-flex items-center justify-center gap-2 bg-[#F5A800] hover:bg-[#E09800] text-[#1A1A2E] font-semibold px-6 py-3.5 rounded-lg text-base transition-colors"
            >
              Ürünleri İncele
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/hakkimizda"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/30 px-6 py-3.5 rounded-lg text-base transition-colors"
            >
              Hakkımızda
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: '6', label: 'Dünya Markası' },
            { value: '1000+', label: 'Ürün Çeşidi' },
            { value: '500+', label: 'Mutlu Müşteri' },
            { value: '7/24', label: 'Destek Hattı' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#F5A800]">{stat.value}</div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
