import { FiShield, FiTruck, FiHeadphones, FiPackage } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Orijinal Parça Garantisi',
    description: 'Tüm ürünlerimiz orijinal veya OEM kalitesinde garanti kapsamında sunulmaktadır.',
  },
  {
    icon: FiTruck,
    title: 'Hızlı Teslimat',
    description: 'Stokta bulunan ürünlerimiz aynı gün kargoya verilir. Türkiye geneli hızlı teslimat.',
  },
  {
    icon: FiHeadphones,
    title: 'Uzman Destek Ekibi',
    description: 'Deneyimli teknik ekibimiz doğru parça seçimi konusunda 7/24 destek sağlar.',
  },
  {
    icon: FiPackage,
    title: 'Geniş Stok',
    description: '1000+ ürün çeşidi ile ihtiyacınız olan yedek parçayı hızlıca temin ediyoruz.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">
            Neden Garanti İş Makineleri?
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Yılların deneyimi ve müşteri memnuniyetine odaklanan yaklaşımımızla fark yaratıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-xl border border-gray-100 hover:border-[#0057A8]/20 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-[#E6F0FA] group-hover:bg-[#0057A8] rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <feature.icon className="w-6 h-6 text-[#0057A8] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-[#1A1A2E] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
