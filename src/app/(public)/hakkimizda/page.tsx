import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Garanti İş Makineleri hakkında bilgi edinin. Ankara merkezli yedek parça sektöründe 20 yıllık deneyim.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-[#0057A8] to-[#004080] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            İş makinesi yedek parça sektöründe güvenilir çözüm ortağınız.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Garanti İş Makineleri Tic. ve San. Ltd. Şti.</h2>
          <p className="text-[#6B7280] leading-relaxed mb-6">
            Garanti İş Makineleri, Ankara merkezli Türkiye&apos;nin önde gelen iş makinesi yedek parça tedarikçilerinden biridir.
            20 yılı aşkın sektör deneyimimizle, Volvo, Komatsu, Caterpillar, Hidromek, John Deere ve Champion
            gibi dünya markalarının orijinal ve muadil yedek parçalarını müşterilerimize sunuyoruz.
          </p>

          <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Vizyonumuz</h3>
          <p className="text-[#6B7280] leading-relaxed mb-6">
            İş makinesi yedek parça sektöründe Türkiye&apos;nin en güvenilir ve en hızlı tedarikçisi olmak.
            Müşterilerimizin iş sürekliliğini sağlamak için en kaliteli ürünleri en uygun koşullarda sunmak.
          </p>

          <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Misyonumuz</h3>
          <p className="text-[#6B7280] leading-relaxed mb-6">
            Müşterilerimize orijinal kalitede yedek parça tedariği sağlayarak iş makinelerinin verimli çalışmasını
            desteklemek. Uzman kadromuzla doğru parça seçiminde rehberlik etmek ve sektörde güven inşa etmek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">Değerlerimiz</h3>
              <ul className="space-y-2 text-[#6B7280]">
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A800] font-bold">•</span>
                  Müşteri memnuniyeti odaklılık
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A800] font-bold">•</span>
                  Ürün kalitesinden ödün vermeme
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A800] font-bold">•</span>
                  Hızlı ve güvenilir teslimat
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5A800] font-bold">•</span>
                  Şeffaf ve dürüst iletişim
                </li>
              </ul>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">Rakamlarla Biz</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-[#0057A8]">20+</div>
                  <div className="text-sm text-[#6B7280]">Yıllık Deneyim</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0057A8]">6</div>
                  <div className="text-sm text-[#6B7280]">Dünya Markası</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0057A8]">1000+</div>
                  <div className="text-sm text-[#6B7280]">Ürün Çeşidi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0057A8]">500+</div>
                  <div className="text-sm text-[#6B7280]">Mutlu Müşteri</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
