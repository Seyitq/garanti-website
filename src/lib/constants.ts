export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '[INSERT_WA_NUMBER]';
export const SITE_NAME = 'Garanti İş Makineleri';
export const SITE_TITLE = 'Garanti İş Makineleri | Yedek Parça Tedarikçisi';
export const SITE_DESCRIPTION = "Ankara merkezli güvenilir iş makinesi yedek parça tedarikçisi. Volvo, Komatsu, Caterpillar, Hidromek, John Deere ve Champion yedek parçaları.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://garantiismakineleri.com';

export const BRANDS = [
  { name: 'Volvo', slug: 'volvo' },
  { name: 'Champion', slug: 'champion' },
  { name: 'Komatsu', slug: 'komatsu' },
  { name: 'Caterpillar', slug: 'caterpillar' },
  { name: 'Hidromek', slug: 'hidromek' },
  { name: 'John Deere', slug: 'john-deere' },
] as const;

export const SUBCATEGORIES = [
  'Motor Parçaları',
  'Hidrolik Sistem',
  'Elektrik Sistemi',
  'Şasi & Gövde',
  'Filtreler',
  'Fren Sistemi',
  'Aktarma Organları',
  'Soğutma Sistemi',
] as const;

export function getStockInfo(quantity: number): { label: string; color: string; badgeClass: string } {
  if (quantity <= 0) return { label: 'Stok Dışı', color: 'bg-red-100 text-red-800', badgeClass: 'badge-out-of-stock' };
  if (quantity <= 5) return { label: 'Az Kaldı', color: 'bg-yellow-100 text-yellow-800', badgeClass: 'badge-low-stock' };
  return { label: 'Stokta Var', color: 'bg-green-100 text-green-800', badgeClass: 'badge-in-stock' };
}

export const COLORS = {
  primary: '#0057A8',
  secondary: '#FFFFFF',
  accent: '#F5A800',
  text: '#1A1A2E',
  whatsapp: '#25D366',
} as const;

export function slugify(text: string): string {
  const charMap: Record<string, string> = {
    ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I',
    ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U',
  };
  return text
    .split('')
    .map((c) => charMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getWhatsAppUrl(productName?: string, partCode?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;
  if (productName && partCode) {
    const message = encodeURIComponent(
      `Merhaba, ${productName} (Parça Kodu: ${partCode}) hakkında bilgi almak istiyorum.`
    );
    return `${baseUrl}?text=${message}`;
  }
  return baseUrl;
}
