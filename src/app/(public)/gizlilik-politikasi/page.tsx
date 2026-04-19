import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Garanti İş Makineleri gizlilik politikası.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-[#0057A8] to-[#004080] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Gizlilik Politikası</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none text-[#6B7280] space-y-6">
          <p>Son güncelleme: Nisan 2026</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">1. Genel Bilgilendirme</h2>
          <p>Garanti İş Makineleri Tic. ve San. Ltd. Şti. (&quot;Şirket&quot;) olarak, web sitemizi ziyaret eden kullanıcılarımızın gizliliğini korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">2. Toplanan Veriler</h2>
          <p>Web sitemiz üzerinden aşağıdaki veriler toplanabilir:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>İletişim bilgileri (ad, soyad, telefon, e-posta)</li>
            <li>WhatsApp üzerinden gönderilen mesaj içerikleri</li>
            <li>Çerez verileri (ziyaret bilgileri, tercihler)</li>
            <li>IP adresi ve tarayıcı bilgileri</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A2E]">3. Veri Kullanım Amaçları</h2>
          <p>Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ürün ve hizmetlerimiz hakkında bilgi sağlamak</li>
            <li>Müşteri taleplerine yanıt vermek</li>
            <li>Web sitesi deneyimini iyileştirmek</li>
            <li>Yasal yükümlülükleri yerine getirmek</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A2E]">4. Çerezler</h2>
          <p>Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">5. Veri Güvenliği</h2>
          <p>Kişisel verileriniz, uygun teknik ve idari tedbirlerle korunmaktadır. Verilerinize yetkisiz erişimi önlemek için endüstri standartlarında güvenlik önlemleri uygulanmaktadır.</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">6. İletişim</h2>
          <p>Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:</p>
          <p className="font-medium text-[#1A1A2E]">E-posta: info@garantiismakineleri.com</p>
        </div>
      </div>
    </div>
  );
}
