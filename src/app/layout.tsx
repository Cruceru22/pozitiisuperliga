import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import PostHogProvider from "~/providers/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poziții SuperLiga | Statistici Fotbal Românesc",
  description: "Clasamente, poziții SuperLiga, echipe și statistici complete pentru fotbalul românesc. Urmărește poziții echipe în SuperLiga României în timp real.",
  keywords: "poziții SuperLiga, clasament SuperLiga, fotbal românesc, echipe SuperLiga, statistici fotbal, Liga 1 România",
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <PostHogProvider />
      <body className={`${inter.className} bg-[#f0f4f0] min-h-screen`}>
        <div className="bg-[radial-gradient(#1f5c2e_2px,transparent_2px)] bg-[length:24px_24px]">
          <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-md border-b-4 border-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <Link href="/" className="hover:opacity-90 transition-opacity">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      <span className="text-white">Poziții</span> <span className="text-yellow-300">SuperLiga</span>
                    </h1>
                    <p className="text-sm md:text-base text-green-100 mt-1">
                      Clasamente și statistici pentru fotbalul românesc
                    </p>
                  </Link>
                </div>
                
                <nav className="flex flex-wrap justify-center md:justify-end gap-3">
                  <Link 
                    href="/" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-green-600 hover:bg-green-500 rounded-lg shadow-md transition-all font-medium text-white border border-green-500/30"
                  >
                    Acasă
                  </Link>
                  <Link 
                    href="/pozitii" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-green-600 hover:bg-green-500 rounded-lg shadow-md transition-all font-medium text-white border border-green-500/30"
                  >
                    Clasamente
                  </Link>
                  <Link 
                    href="/echipe" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-green-600 hover:bg-green-500 rounded-lg shadow-md transition-all font-medium text-white border border-green-500/30"
                  >
                    Echipe
                  </Link>
                  <Link 
                    href="/stiri" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-green-600 hover:bg-green-500 rounded-lg shadow-md transition-all font-medium text-white border border-green-500/30"
                  >
                    Știri
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-green-900 text-white py-6 border-t-4 border-white">
            <div className="container mx-auto px-4 text-center">
              <p>© {new Date().getFullYear()} Poziții SuperLiga - Statistici Fotbal Românesc</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
