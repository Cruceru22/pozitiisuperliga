import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate | Pozitii SuperLiga",
  description: "Politica de confidențialitate a site-ului Pozitii SuperLiga. Aflați cum colectăm, utilizăm și protejăm datele dumneavoastră personale.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Politica de Confidențialitate</h1>
      
      <div className="prose prose-green max-w-none">
        <p className="mb-4">
          Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Introducere</h2>
        <p>
          Bine ați venit pe Pozitii SuperLiga! Confidențialitatea datelor dumneavoastră este o prioritate pentru noi. 
          Această Politică de Confidențialitate explică modul în care colectăm, utilizăm, dezvăluim și protejăm informațiile dumneavoastră atunci când utilizați site-ul nostru.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Informațiile pe care le colectăm</h2>
        <p>
          <strong>Informații furnizate în mod automat:</strong> Când vizitați site-ul nostru, serverele noastre pot înregistra automat anumite informații, cum ar fi adresa IP, tipul de browser, paginile vizitate, timpul petrecut pe site și alte statistici.
        </p>
        <p>
          <strong>Cookie-uri și tehnologii similare:</strong> Utilizăm cookie-uri și tehnologii similare pentru a îmbunătăți experiența utilizatorilor, pentru a analiza tendințele și pentru a administra site-ul. Pentru mai multe informații, consultați Politica noastră de Cookie-uri.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. Cum utilizăm informațiile</h2>
        <p>Utilizăm informațiile colectate pentru:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>A furniza, opera și menține site-ul nostru</li>
          <li>A îmbunătăți experiența utilizatorilor</li>
          <li>A înțelege și analiza modul în care utilizați site-ul nostru</li>
          <li>A dezvolta noi produse, servicii și funcționalități</li>
          <li>A comunica cu dumneavoastră, direct sau prin partenerii noștri</li>
          <li>A detecta, preveni și rezolva probleme tehnice sau de securitate</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Partajarea informațiilor</h2>
        <p>
          Nu vindem, nu comercializăm și nu transferăm către terți informațiile dumneavoastră personale, cu excepția următoarelor situații:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Furnizorilor de servicii care ne ajută în operarea site-ului nostru</li>
          <li>Autorităților, dacă suntem obligați prin lege</li>
          <li>În cazul unei fuziuni, vânzări de active sau reorganizări</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Securitatea datelor</h2>
        <p>
          Securitatea datelor dumneavoastră este importantă pentru noi, dar rețineți că nicio metodă de transmitere prin internet sau de stocare electronică nu este 100% sigură. 
          Deși ne străduim să folosim mijloace acceptabile comercial pentru a proteja informațiile dumneavoastră personale, nu putem garanta securitatea absolută.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Drepturile dumneavoastră</h2>
        <p>
          În conformitate cu legislația aplicabilă, puteți avea următoarele drepturi în ceea ce privește datele dumneavoastră personale:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Dreptul de acces la datele personale</li>
          <li>Dreptul la rectificarea datelor inexacte</li>
          <li>Dreptul la ștergerea datelor</li>
          <li>Dreptul la restricționarea prelucrării</li>
          <li>Dreptul la portabilitatea datelor</li>
          <li>Dreptul de a vă opune prelucrării</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. Modificări ale acestei politici</h2>
        <p>
          Putem actualiza periodic această politică de confidențialitate. Vă vom notifica despre orice modificări prin postarea noii politici de confidențialitate pe această pagină.
          Vă recomandăm să revizuiți periodic această politică de confidențialitate pentru a fi informat despre modul în care vă protejăm informațiile.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact</h2>
        <p>
          Dacă aveți întrebări sau preocupări cu privire la această politică de confidențialitate, vă rugăm să ne contactați la: <a href="mailto:pozitiisuperliga@gmail.com" className="text-green-600 hover:text-green-800">pozitiisuperliga@gmail.com</a>
        </p>
      </div>
    </div>
  );
} 