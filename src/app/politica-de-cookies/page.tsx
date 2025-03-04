import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Cookies | Pozitii SuperLiga",
  description: "Politica de cookies a site-ului Pozitii SuperLiga. Aflați cum utilizăm cookie-urile pentru a îmbunătăți experiența dumneavoastră pe site.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Politica de Cookies</h1>
      
      <div className="prose prose-green max-w-none">
        <p className="mb-4">
          Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Ce sunt cookie-urile?</h2>
        <p>
          Cookie-urile sunt fișiere text de mici dimensiuni care sunt stocate pe dispozitivul dumneavoastră (computer, tabletă, telefon mobil) atunci când vizitați un site web. 
          Cookie-urile sunt utilizate pe scară largă pentru a face site-urile web să funcționeze mai eficient, precum și pentru a furniza informații proprietarilor site-ului.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Cum utilizăm cookie-urile</h2>
        <p>
          Site-ul nostru utilizează cookie-uri pentru a vă distinge de alți utilizatori ai site-ului nostru. Acest lucru ne ajută să vă oferim o experiență bună atunci când navigați pe site-ul nostru și ne permite, de asemenea, să îl îmbunătățim.
        </p>
        <p>
          Utilizăm următoarele tipuri de cookie-uri:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Cookie-uri strict necesare:</strong> Acestea sunt esențiale pentru funcționarea site-ului și vă permit să utilizați funcționalitățile sale de bază.</li>
          <li><strong>Cookie-uri de analiză/performanță:</strong> Ne permit să recunoaștem și să numărăm vizitatorii și să vedem cum se deplasează vizitatorii pe site-ul nostru atunci când îl utilizează. Acest lucru ne ajută să îmbunătățim modul în care funcționează site-ul nostru.</li>
          <li><strong>Cookie-uri de funcționalitate:</strong> Acestea sunt utilizate pentru a vă recunoaște atunci când reveniți pe site-ul nostru. Acest lucru ne permite să personalizăm conținutul nostru pentru dumneavoastră.</li>
          <li><strong>Cookie-uri de publicitate:</strong> Acestea înregistrează vizita dumneavoastră pe site-ul nostru, paginile pe care le-ați vizitat și link-urile pe care le-ați urmat. Utilizăm aceste informații pentru a face publicitatea afișată pe site mai relevantă pentru interesele dumneavoastră.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. Cookie-uri terțe</h2>
        <p>
          Pe lângă cookie-urile noastre, permitem și unor terțe părți să plaseze cookie-uri pe dispozitivul dumneavoastră atunci când vizitați site-ul nostru. Aceste cookie-uri terțe includ:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Google Analytics:</strong> Pentru a analiza traficul și comportamentul utilizatorilor pe site-ul nostru.</li>
          <li><strong>Google AdSense:</strong> Pentru a afișa reclame relevante pentru interesele dumneavoastră.</li>
          <li><strong>PostHog:</strong> Pentru analiza comportamentului utilizatorilor și îmbunătățirea experienței pe site.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Cum să controlați cookie-urile</h2>
        <p>
          Puteți controla și/sau șterge cookie-urile după cum doriți. Puteți șterge toate cookie-urile care sunt deja pe dispozitivul dumneavoastră și puteți seta majoritatea browserelor să împiedice plasarea acestora.
        </p>
        <p>
          Majoritatea browserelor web vă permit să controlați cookie-urile prin setările browserului. Pentru a afla mai multe despre cookie-uri, inclusiv despre modul în care puteți vedea ce cookie-uri au fost setate și cum să le gestionați și să le ștergeți, vizitați <a href="https://www.aboutcookies.org" className="text-green-600 hover:text-green-800" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> sau <a href="https://www.allaboutcookies.org" className="text-green-600 hover:text-green-800" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
        </p>
        <p>
          Vă rugăm să rețineți că, dacă alegeți să dezactivați cookie-urile, este posibil să nu puteți utiliza toate funcționalitățile site-ului nostru.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Modificări ale politicii de cookie-uri</h2>
        <p>
          Putem actualiza această politică de cookie-uri din când în când pentru a reflecta, de exemplu, modificări ale cookie-urilor pe care le folosim sau din alte motive operaționale, legale sau de reglementare. Vă rugăm să vizitați această pagină în mod regulat pentru a vă menține informat cu privire la utilizarea cookie-urilor și a tehnologiilor conexe.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Contact</h2>
        <p>
          Dacă aveți întrebări despre utilizarea cookie-urilor sau a altor tehnologii, vă rugăm să ne contactați la: <a href="mailto:pozitiisuperliga@gmail.com" className="text-green-600 hover:text-green-800">pozitiisuperliga@gmail.com</a>
        </p>
      </div>
    </div>
  );
} 