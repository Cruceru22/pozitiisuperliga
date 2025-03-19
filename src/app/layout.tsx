import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import PostHogProvider from "~/providers/PostHogProvider";
import { GoogleAdSenseScript } from "~/components/GoogleAdSenseScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poziții SuperLiga | Statistici Fotbal Românesc",
  description: "Clasamente, poziții SuperLiga, echipe și statistici complete pentru fotbalul românesc. Urmărește poziții echipe în SuperLiga României în timp real.",
  keywords: "poziții SuperLiga, clasament SuperLiga, fotbal românesc, echipe SuperLiga, statistici fotbal, Liga 1 România",
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
  metadataBase: new URL('https://pozitiisuperliga.vercel.app'),
  openGraph: {
    title: "Poziții SuperLiga | Statistici Fotbal Românesc",
    description: "Clasamente, poziții SuperLiga, echipe și statistici complete pentru fotbalul românesc.",
    images: ['/apple-icon.png'],
  },
  other: {
    'google-adsense-account': 'pub-8684151047710849',
    'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://www.google-analytics.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; img-src 'self' data: https: http:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://pagead2.googlesyndication.com https://www.google-analytics.com;"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <PostHogProvider />
        <GoogleAdSenseScript />
        <div className="flex flex-col min-h-screen bg-[radial-gradient(#000000_2px,transparent_2px)] bg-[length:24px_24px]">
          <header className="bg-green-600 text-white shadow-md border-b-4 border-white">
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
                    className="w-[120px] h-[44px] flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all font-medium text-white border border-green-500/30"
                  >
                    Clasamente
                  </Link>
                  <Link 
                    href="/echipe" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all font-medium text-white border border-green-500/30"
                  >
                    Echipe
                  </Link>
                  <Link 
                    href="/stiri" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all font-medium text-white border border-green-500/30"
                  >
                    Știri
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex-grow">
            {children}
          </main>
          <footer className="mt-auto py-6 bg-green-600 text-white w-full">
            <div className="container mx-auto px-2 sm:px-4">
              <div className="flex flex-col items-center">
                <p className="mb-4">© {new Date().getFullYear()} Pozitii SuperLiga - Statistici Fotbal Românesc</p>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link href="/politica-de-confidentialitate" className="text-green-100 hover:text-white transition-colors">
                    Politica de Confidențialitate
                  </Link>
                  <Link href="/politica-de-cookies" className="text-green-100 hover:text-white transition-colors">
                    Politica de Cookies
                  </Link>
                  <Link href="/termeni-si-conditii" className="text-green-100 hover:text-white transition-colors">
                    Termeni și Condiții
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
