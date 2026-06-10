import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props) {
  return buildPageMetadata({ locale, path: '/impressum', title: 'Impressum' });
}

export default async function ImpressumPage({ params: { locale } }: Props) {
  const isDE = locale === 'de';

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        <h1 className="font-display italic text-5xl text-black mb-12">Impressum</h1>

        <div className="space-y-8 font-sans text-sm text-black/80 leading-relaxed">
          <section>
            <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3">
              {isDE ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}
            </h2>
            <address className="not-italic space-y-1">
              <p className="font-semibold text-black">Vira Linevych</p>
              <p>[Vollständiger Name — bitte ergänzen]</p>
              <p>[Straße und Hausnummer]</p>
              <p>[PLZ] Berlin</p>
              <p>Deutschland</p>
            </address>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3">Kontakt</h2>
            <p>Telefon: [+49 ...]</p>
            <p>E-Mail: [hello@yourdomain.de]</p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3">
              {isDE ? 'Umsatzsteuer-Identifikationsnummer' : 'VAT ID'}
            </h2>
            <p>
              {isDE
                ? 'Sofern vorhanden: USt-IdNr. gemäß § 27a UStG: [DE...]'
                : 'If applicable: VAT ID pursuant to § 27a UStG: [DE...]'}
            </p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3">
              {isDE ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Responsible for content (§ 55 RStV)'}
            </h2>
            <p>Vira Linevych</p>
            <p>[Adresse wie oben]</p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3">
              {isDE ? 'Streitschlichtung' : 'Dispute resolution'}
            </h2>
            <p>
              {isDE
                ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr/. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
            </p>
          </section>

          <section>
            <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3">
              {isDE ? 'Haftungsausschluss' : 'Liability disclaimer'}
            </h2>
            <p>
              {isDE
                ? 'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.'
                : 'Despite careful content control, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
