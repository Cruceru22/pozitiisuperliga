import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și Condiții | Pozitii SuperLiga",
  description: "Termenii și condițiile de utilizare a site-ului Pozitii SuperLiga. Citiți cu atenție înainte de a utiliza serviciile noastre.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Termeni și Condiții</h1>
      
      <div className="prose prose-green max-w-none">
        <p className="mb-4">
          Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptarea termenilor</h2>
        <p>
          Bine ați venit pe Pozitii SuperLiga! Acești Termeni și Condiții guvernează utilizarea site-ului web Pozitii SuperLiga, accesibil la adresa pozitiisuperliga.ro.
        </p>
        <p>
          Prin accesarea și utilizarea acestui site web, sunteți de acord să respectați și să fiți obligat de acești Termeni și Condiții. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați site-ul nostru.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Utilizarea site-ului</h2>
        <p>
          Pozitii SuperLiga oferă informații despre clasamente, echipe și știri din fotbalul românesc. Conținutul este furnizat exclusiv în scopuri informative și de divertisment.
        </p>
        <p>
          Sunteți de acord să utilizați site-ul nostru doar în scopuri legale și într-un mod care să nu încalce drepturile altora sau să restricționeze sau să împiedice utilizarea și bucuria site-ului de către oricine altcineva.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. Proprietate intelectuală</h2>
        <p>
          Conținutul site-ului, inclusiv, dar fără a se limita la, text, grafică, logo-uri, imagini, clipuri audio, descărcări digitale și compilații de date, este proprietatea Pozitii SuperLiga sau a furnizorilor săi de conținut și este protejat de legile române și internaționale privind drepturile de autor.
        </p>
        <p>
          Nu aveți permisiunea să reproduceți, distribuiți, modificați, creați lucrări derivate, afișați public, executați public, republicați, descărcați, stocați sau transmiteți orice material de pe site-ul nostru, cu excepția cazului în care este permis în mod expres.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Limitarea răspunderii</h2>
        <p>
          Informațiile de pe site-ul nostru sunt furnizate "așa cum sunt", fără nicio garanție de niciun fel, expresă sau implicită. În niciun caz, Pozitii SuperLiga sau afiliații săi nu vor fi răspunzători pentru daune directe, indirecte, incidentale, speciale sau consecvente care rezultă din utilizarea sau incapacitatea de a utiliza site-ul.
        </p>
        <p>
          Deși depunem eforturi pentru a menține informațiile de pe site-ul nostru actualizate și corecte, nu garantăm acuratețea, exhaustivitatea sau fiabilitatea oricăror informații de pe site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Link-uri către alte site-uri</h2>
        <p>
          Site-ul nostru poate conține link-uri către site-uri web externe care nu sunt furnizate sau menținute de noi. Nu avem control asupra conținutului acestor site-uri și nu putem accepta responsabilitatea pentru conținutul lor. Orice link nu implică aprobarea de către noi a site-ului sau a conținutului acestuia.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Modificări ale termenilor</h2>
        <p>
          Ne rezervăm dreptul, la discreția noastră, de a modifica sau înlocui acești termeni în orice moment. Dacă o revizuire este semnificativă, vom încerca să oferim o notificare cu cel puțin 30 de zile înainte ca noii termeni să intre în vigoare.
        </p>
        <p>
          Prin continuarea accesării sau utilizării site-ului nostru după ce aceste revizuiri devin efective, sunteți de acord să fiți obligat de termenii revizuiți. Dacă nu sunteți de acord cu noii termeni, vă rugăm să nu mai utilizați site-ul.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. Legea aplicabilă</h2>
        <p>
          Acești termeni și condiții sunt guvernate și interpretate în conformitate cu legile României, iar utilizarea site-ului nostru implică acceptarea jurisdicției exclusive a instanțelor din România.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact</h2>
        <p>
          Dacă aveți întrebări despre acești Termeni și Condiții, vă rugăm să ne contactați la: <a href="mailto:pozitiisuperliga@gmail.com" className="text-green-600 hover:text-green-800">pozitiisuperliga@gmail.com</a>
        </p>
      </div>
    </div>
  );
} 