import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { t } from "~/utils/translations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poziții SuperLiga | Statistici Fotbal Românesc",
  description: "Clasamente, poziții SuperLiga, echipe și statistici complete pentru fotbalul românesc. Urmărește poziții echipe în SuperLiga României în timp real.",
  keywords: "poziții SuperLiga, clasament SuperLiga, fotbal românesc, echipe SuperLiga, statistici fotbal, Liga 1 România",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold">
                  <span className="text-yellow-300">Poziții</span> SuperLiga
                </h1>
                <p className="text-sm md:text-base text-blue-100 mt-1">
                  {t("Live scores, standings, and stats for Romanian football leagues")}
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Poziții SuperLiga - Toate drepturile rezervate
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
