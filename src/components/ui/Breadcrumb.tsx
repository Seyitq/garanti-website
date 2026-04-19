import Link from 'next/link';
import { FiChevronRight, FiHome } from 'react-icons/fi';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-[#6B7280] hover:text-[#0057A8] transition-colors flex items-center gap-1">
            <FiHome className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">Ana Sayfa</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            <FiChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
            {item.href ? (
              <Link href={item.href} className="text-[#6B7280] hover:text-[#0057A8] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1A1A2E] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
