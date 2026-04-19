import Image from 'next/image';

interface ReferenceClient {
  id: string;
  name: string;
  logoUrl: string;
}

export default function BrandCards({ clients }: { clients: ReferenceClient[] }) {
  if (clients.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-3">
            Referans Firmalarımız
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Güvenilir iş ortaklarımız ve referans firmalarımız
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-[#F8FAFC]">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full p-1"
                />
              </div>
              <h3 className="font-semibold text-sm text-[#1A1A2E] transition-colors">
                {client.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
