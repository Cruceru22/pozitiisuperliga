import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import PostHogProvider from "~/providers/PostHogProvider";
import GoogleAdsense from "~/components/GoogleAdsense";

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
    'google-adsense-account': 'ca-pub-8684151047710849',
    'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://www.google-analytics.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; img-src 'self' data: https: http:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://pagead2.googlesyndication.com https://www.google-analytics.com;"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={`${inter.className} bg-[#f0f4f8] min-h-screen`}>
        <PostHogProvider />
        <GoogleAdsense />
        <div className="bg-[radial-gradient(#1e3a8a_2px,transparent_2px)] bg-[length:24px_24px]">
          <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md border-b-4 border-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <Link href="/" className="hover:opacity-90 transition-opacity">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      <span className="text-white">Poziții</span> <span className="text-yellow-300">SuperLiga</span>
                    </h1>
                    <p className="text-sm md:text-base text-blue-100 mt-1">
                      Clasamente și statistici pentru fotbalul românesc
                    </p>
                  </Link>
                </div>
                
                <nav className="flex flex-wrap justify-center md:justify-end gap-3">
                  <Link 
                    href="/" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-all font-medium text-white border border-blue-500/30"
                  >
                    Clasamente
                  </Link>
                  <Link 
                    href="/echipe" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-all font-medium text-white border border-blue-500/30"
                  >
                    Echipe
                  </Link>
                  <Link 
                    href="/stiri" 
                    className="w-[120px] h-[44px] flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-all font-medium text-white border border-blue-500/30"
                  >
                    Știri
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            {children}
          </main>
          <footer className="bg-blue-900 text-white py-4 sm:py-6 border-t-4 border-white">
            <div className="container mx-auto px-2 sm:px-4 text-center">
              <p>© {new Date().getFullYear()} Poziții SuperLiga - Statistici Fotbal Românesc</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
