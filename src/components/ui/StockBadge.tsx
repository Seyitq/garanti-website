import { getStockInfo } from '@/lib/constants';

export default function StockBadge({ quantity }: { quantity: number }) {
  const info = getStockInfo(quantity);
  return (
    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${info.badgeClass}`}>
      {info.label}
    </span>
  );
}
