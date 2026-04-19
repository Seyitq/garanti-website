import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Garanti İş Makineleri KVKK aydınlatma metni.',
};

export default function KVKKPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-[#0057A8] to-[#004080] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">KVKK Aydınlatma Metni</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none text-[#6B7280] space-y-6">
          <p>Son güncelleme: Nisan 2026</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">Veri Sorumlusu</h2>
          <p>Garanti İş Makineleri Tic. ve San. Ltd. Şti. (&quot;Şirket&quot;) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında, veri sorumlusu sıfatıyla aşağıdaki bilgilendirmeyi yapmaktayız.</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">1. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
          <p>Kişisel verileriniz, web sitemiz, WhatsApp, e-posta ve telefon gibi kanallar aracılığıyla, otomatik ve otomatik olmayan yöntemlerle toplanmaktadır. Bu veriler KVKK&apos;nın 5. ve 6. maddelerinde belirtilen hukuki sebeplere dayanılarak işlenmektedir.</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">2. İşlenen Kişisel Veriler</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Kimlik bilgileri (ad, soyad)</li>
            <li>İletişim bilgileri (telefon numarası, e-posta adresi)</li>
            <li>Müşteri işlem bilgileri (talep ve şikayet kayıtları)</li>
            <li>İşlem güvenliği bilgileri (IP adresi, log kayıtları)</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A2E]">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ürün ve hizmetlerimizin sunulması</li>
            <li>Müşteri ilişkileri yönetimi</li>
            <li>İletişim faaliyetlerinin yürütülmesi</li>
            <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
            <li>Şirket faaliyetlerinin mevzuata uygun yürütülmesi</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A2E]">4. Kişisel Verilerin Aktarılması</h2>
          <p>Kişisel verileriniz, KVKK&apos;nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde, iş ortaklarımıza, tedarikçilerimize ve yasal olarak yetkili kamu kurum ve kuruluşlarına aktarılabilecektir.</p>

          <h2 className="text-xl font-bold text-[#1A1A2E]">5. Veri Sahibi Olarak Haklarınız</h2>
          <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
            <li>Kişisel verilerin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Kişisel verilerin düzeltilmesini veya silinmesini isteme</li>
            <li>İşlenen verilerin münhasıran otomatik sistemler aracılığıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A2E]">6. İletişim</h2>
          <p>KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:</p>
          <p className="font-medium text-[#1A1A2E]">E-posta: kvkk@garantiismakineleri.com</p>
        </div>
      </div>
    </div>
  );
}
