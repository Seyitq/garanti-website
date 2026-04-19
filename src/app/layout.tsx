import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Garanti İş Makineleri | Yedek Parça Tedarikçisi",
    template: "%s | Garanti İş Makineleri",
  },
  description: "Ankara merkezli güvenilir iş makinesi yedek parça tedarikçisi. Volvo, Komatsu, Caterpillar, Hidromek, John Deere ve Champion yedek parçaları.",
  keywords: ["iş makinesi yedek parça", "ekskavatör parçaları", "volvo yedek parça", "komatsu yedek parça", "caterpillar yedek parça", "ankara yedek parça"],
  authors: [{ name: "Garanti İş Makineleri" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Garanti İş Makineleri",
    title: "Garanti İş Makineleri | Yedek Parça Tedarikçisi",
    description: "Ankara merkezli güvenilir iş makinesi yedek parça tedarikçisi.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1A1A2E]">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
