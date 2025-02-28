import type { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, Users, Newspaper, Dribbble } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Poziții SuperLiga | Statistici Fotbal Românesc',
  description: 'Clasamente, poziții SuperLiga, echipe și statistici complete pentru fotbalul românesc. Urmărește poziții echipe în SuperLiga României în timp real.',
  keywords: 'poziții SuperLiga, clasament SuperLiga, fotbal românesc, echipe SuperLiga, statistici fotbal, Liga 1 România',
};

// Feature card component
function FeatureCard({ 
  title, 
  description, 
  icon, 
  href 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string;
}) {
  return (
    <Link 
      href={href}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-green-100 group flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="p-7 flex-grow flex flex-col">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5 text-green-700 group-hover:bg-green-700 group-hover:text-white transition-all duration-300 shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-green-700 transition-colors">{title}</h3>
        <p className="text-gray-600 flex-grow leading-relaxed text-base font-normal mb-4">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gradient-to-r from-green-700 to-green-800 text-white text-center font-medium mt-auto group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
        Accesează
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-green-800 via-green-900 to-green-700"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:16px_16px]"></div>
        <div className="relative py-16 px-8 md:py-24 md:px-12 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Bine ați venit pe <span className="text-yellow-300">Poziții SuperLiga</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-green-50">
            Urmăriți clasamente, echipe și cele mai recente știri din fotbalul românesc
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/pozitii" 
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full shadow-md transition-colors"
            >
              Vezi Clasamentul
            </Link>
            <Link 
              href="/echipe" 
              className="bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-6 rounded-full shadow-md transition-colors"
            >
              Explorează Echipele
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Clasamente"
            description="Urmărește clasamentele actualizate pentru toate ligile românești de fotbal."
            icon={<Trophy className="w-7 h-7" />}
            href="/pozitii"
          />
          
          <FeatureCard
            title="Echipe"
            description="Descoperă informații detaliate despre echipele din SuperLiga și loturile lor."
            icon={<Users className="w-7 h-7" />}
            href="/echipe"
          />
          
          <FeatureCard
            title="Știri Fotbal"
            description="Citește cele mai recente știri și actualizări din lumea fotbalului românesc."
            icon={<Newspaper className="w-7 h-7" />}
            href="/stiri"
          />
        </div>
      </section>
      
      {/* Promo Section */}
      <section className="bg-white rounded-xl p-8 shadow-md border-l-4 border-green-600">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pasionat de Fotbalul Românesc?</h2>
            <p className="text-gray-600 mb-4">
              Poziții SuperLiga îți oferă toate informațiile de care ai nevoie pentru a urmări echipele tale favorite din fotbalul românesc.
              Clasamente actualizate, informații despre echipe și cele mai recente știri, toate într-un singur loc.
            </p>
            <p className="text-gray-600">
              Aplicația noastră este actualizată în timp real cu cele mai recente date din SuperLiga și alte competiții românești.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center shadow-md">
              <Dribbble className="w-20 h-20 text-green-700" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
