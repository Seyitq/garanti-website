import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

const brands = [
  { name: 'Volvo', slug: 'volvo' },
  { name: 'Champion', slug: 'champion' },
  { name: 'Komatsu', slug: 'komatsu' },
  { name: 'Caterpillar', slug: 'caterpillar' },
  { name: 'Hidromek', slug: 'hidromek' },
  { name: 'John Deere', slug: 'john-deere' },
];

const subcategories = [
  { name: 'Motor Parçaları', slug: 'motor-parcalari' },
  { name: 'Hidrolik Sistem', slug: 'hidrolik-sistem' },
  { name: 'Elektrik Sistemi', slug: 'elektrik-sistemi' },
  { name: 'Şasi & Gövde', slug: 'sasi-govde' },
  { name: 'Filtreler', slug: 'filtreler' },
  { name: 'Fren Sistemi', slug: 'fren-sistemi' },
  { name: 'Aktarma Organları', slug: 'aktarma-organlari' },
  { name: 'Soğutma Sistemi', slug: 'sogutma-sistemi' },
];

const sampleProducts = [
  { name: 'Hidrolik Pompa', oemCode: 'VOL-HP-2024', brandSlug: 'volvo', catSlug: 'hidrolik-sistem', desc: 'Volvo iş makineleri için orijinal hidrolik pompa. Yüksek basınç dayanımı ve uzun ömürlü tasarım.', models: 'EC210, EC240, EC290', stock: 10, featured: true },
  { name: 'Motor Yağ Filtresi', oemCode: 'VOL-MF-1087', brandSlug: 'volvo', catSlug: 'filtreler', desc: 'Volvo motor yağ filtresi. OEM kalitesinde, uzun kullanım ömrü.', models: 'EC140, EC210, EC240', stock: 15, featured: true },
  { name: 'Turbo Şarj', oemCode: 'KOM-TS-3340', brandSlug: 'komatsu', catSlug: 'motor-parcalari', desc: 'Komatsu ekskavatörler için turbo şarj ünitesi. Yüksek performans ve dayanıklılık.', models: 'PC200-8, PC210-10, PC220-8', stock: 8, featured: true },
  { name: 'Fren Balata Seti', oemCode: 'CAT-FB-4412', brandSlug: 'caterpillar', catSlug: 'fren-sistemi', desc: 'Caterpillar iş makineleri için fren balata seti. Güvenli ve uzun ömürlü.', models: '320D, 325D, 330D', stock: 3, featured: true },
  { name: 'Alternatör', oemCode: 'HID-AL-5567', brandSlug: 'hidromek', catSlug: 'elektrik-sistemi', desc: 'Hidromek kazıcı yükleyiciler için 24V alternatör. Yüksek akım kapasitesi.', models: 'HMK 102B, HMK 220LC', stock: 12, featured: true },
  { name: 'Şanzıman Dişli Seti', oemCode: 'JD-SD-7789', brandSlug: 'john-deere', catSlug: 'aktarma-organlari', desc: 'John Deere traktörleri için şanzıman dişli seti. OEM spesifikasyonlarına uygun.', models: '6130R, 6155R, 6195R', stock: 6, featured: true },
  { name: 'Radyatör', oemCode: 'KOM-RD-2255', brandSlug: 'komatsu', catSlug: 'sogutma-sistemi', desc: 'Komatsu ekskavatörler için bakır radyatör. Üstün soğutma performansı.', models: 'PC200-8, PC300-8', stock: 7, featured: true },
  { name: 'Palet Zinciri', oemCode: 'CAT-PZ-8891', brandSlug: 'caterpillar', catSlug: 'sasi-govde', desc: 'Caterpillar paletli ekskavatörler için çelik palet zinciri. Yüksek çekme dayanımı.', models: '320D, 325D, 330D, 336D', stock: 9, featured: true },
  { name: 'Hidrolik Silindir', oemCode: 'VOL-HS-3344', brandSlug: 'volvo', catSlug: 'hidrolik-sistem', desc: 'Volvo ekskavatörler için bom hidrolik silindiri. Tam sızdırmazlık garantili.', models: 'EC210, EC240', stock: 2, featured: true },
  { name: 'Yakıt Filtresi', oemCode: 'CHM-YF-1123', brandSlug: 'champion', catSlug: 'filtreler', desc: 'Champion greyder için yakıt filtresi. Motor performansını korur.', models: '710A, 720A, 730A', stock: 20, featured: false },
  { name: 'Marş Motoru', oemCode: 'HID-MM-6678', brandSlug: 'hidromek', catSlug: 'elektrik-sistemi', desc: 'Hidromek ekskavatörler için 24V marş motoru. Güvenilir çalıştırma.', models: 'HMK 220LC, HMK 300LC', stock: 0, featured: false },
  { name: 'Devirdaim Pompası', oemCode: 'JD-DP-9901', brandSlug: 'john-deere', catSlug: 'sogutma-sistemi', desc: 'John Deere motorları için devirdaim (su) pompası. Uzun ömürlü rulman yapısı.', models: '6130R, 6155R', stock: 11, featured: true },
  { name: 'Krank Mili', oemCode: 'KOM-KM-4456', brandSlug: 'komatsu', catSlug: 'motor-parcalari', desc: 'Komatsu motorları için dövme çelik krank mili. OEM toleranslarına uygun.', models: 'PC200-8, PC210-10', stock: 4, featured: false },
  { name: 'Hidrolik Hortum Seti', oemCode: 'CAT-HH-5523', brandSlug: 'caterpillar', catSlug: 'hidrolik-sistem', desc: 'Caterpillar ekskavatörler için yüksek basınç hidrolik hortum seti.', models: '320D, 325D', stock: 14, featured: false },
  { name: 'Far Seti', oemCode: 'VOL-FS-7712', brandSlug: 'volvo', catSlug: 'elektrik-sistemi', desc: 'Volvo iş makineleri için LED far seti. Geniş aydınlatma açısı.', models: 'EC210, EC240, EC290, EC350', stock: 18, featured: false },
  { name: 'Greyder Bıçağı', oemCode: 'CHM-GB-2234', brandSlug: 'champion', catSlug: 'sasi-govde', desc: 'Champion greyder için sertleştirilmiş çelik bıçak. Uzun kullanım ömrü.', models: '710A, 720A', stock: 5, featured: true },
];

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@garantiismakineleri.com' },
    update: {},
    create: {
      email: 'admin@garantiismakineleri.com',
      passwordHash,
      name: 'Admin',
      role: 'super_admin',
    },
  });

  // Create brands
  const brandMap: Record<string, string> = {};
  for (const b of brands) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {},
      create: { name: b.name, slug: b.slug, sortOrder: brands.indexOf(b) },
    });
    brandMap[b.slug] = brand.id;
  }

  // Create categories for each brand
  const catMap: Record<string, string> = {};
  for (const b of brands) {
    for (const sc of subcategories) {
      const cat = await prisma.category.upsert({
        where: { brandId_slug: { brandId: brandMap[b.slug], slug: sc.slug } },
        update: {},
        create: {
          name: sc.name,
          slug: sc.slug,
          brandId: brandMap[b.slug],
          sortOrder: subcategories.indexOf(sc),
        },
      });
      catMap[`${b.slug}:${sc.slug}`] = cat.id;
    }
  }

  // Create products
  for (const p of sampleProducts) {
    const brandId = brandMap[p.brandSlug];
    const categoryId = catMap[`${p.brandSlug}:${p.catSlug}`];
    const slug = p.name
      .toLowerCase()
      .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
      .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    await prisma.product.upsert({
      where: { brandId_categoryId_slug: { brandId, categoryId, slug } },
      update: {},
      create: {
        name: p.name,
        slug,
        oemCode: p.oemCode,
        brandId,
        categoryId,
        description: p.desc,
        compatibleModels: p.models,
        stockQuantity: p.stock,
        isFeatured: p.featured,
        images: {
          create: [
            { url: `/images/products/placeholder.svg`, alt: p.name, sortOrder: 0 },
          ],
        },
        specifications: {
          create: [
            { key: 'OEM Kodu', value: p.oemCode, sortOrder: 0 },
            { key: 'Marka', value: brands.find(b => b.slug === p.brandSlug)!.name, sortOrder: 1 },
          ],
        },
      },
    });
  }

  // Hero slides
  await prisma.heroSlide.upsert({
    where: { id: 'hero-1' },
    update: {},
    create: {
      id: 'hero-1',
      title: "Türkiye'nin Güvenilir İş Makinesi Yedek Parça Tedarikçisi",
      subtitle: 'Volvo, Komatsu, Caterpillar, Hidromek, John Deere ve Champion için orijinal ve muadil yedek parçalar.',
      imageUrl: '/images/hero/hero-bg.jpg',
      ctaLink: '/urunler',
      sortOrder: 0,
    },
  });

  console.log('Seed complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
