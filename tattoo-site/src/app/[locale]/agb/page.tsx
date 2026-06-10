import { buildPageMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props) {
  return buildPageMetadata({
    locale,
    path: '/agb',
    title: locale === 'de' ? 'AGB' : 'Terms & Conditions',
  });
}

export default function AgbPage({ params: { locale } }: Props) {
  const isDE = locale === 'de';

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3 mt-10">{children}</h2>
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        <h1 className="font-display italic text-5xl text-black mb-12">
          {isDE ? 'Allgemeine Geschäftsbedingungen' : 'Terms & Conditions'}
        </h1>

        <div className="space-y-4 font-sans text-sm text-black/80 leading-relaxed">
          <H2>{isDE ? '1. Buchungsablauf' : '1. Booking process'}</H2>
          <p>
            {isDE
              ? 'Termine werden ausschließlich über das Online-Buchungsformular oder per E-Mail angefragt. Eine Buchungsanfrage stellt kein verbindliches Angebot dar. Verbindlich wird ein Termin erst nach schriftlicher Bestätigung durch Vira Linevych.'
              : 'Appointments are requested exclusively through the online booking form or by email. A booking inquiry does not constitute a binding offer. An appointment is only binding once confirmed in writing by Vira Linevych.'}
          </p>

          <H2>{isDE ? '2. Anzahlung' : '2. Deposit'}</H2>
          <p>
            {isDE
              ? 'Für jeden bestätigten Termin ist eine Anzahlung in Höhe von [Betrag, z.B. 50 €] fällig. Die Anzahlung wird auf den Gesamtpreis angerechnet und ist nicht rückerstattbar, sofern der Termin nicht mindestens 72 Stunden vorher storniert wird.'
              : 'A deposit of [amount, e.g. €50] is required for each confirmed appointment. The deposit is applied to the total price and is non-refundable unless the appointment is cancelled at least 72 hours in advance.'}
          </p>

          <H2>{isDE ? '3. Stornierung und Umbuchung' : '3. Cancellation and rescheduling'}</H2>
          <p>
            {isDE
              ? 'Stornierungen müssen mindestens 72 Stunden vor dem Termin erfolgen. Bei späterer Stornierung oder Nichterscheinen verfällt die Anzahlung. Umbuchungen sind einmalig kostenfrei möglich, sofern sie mindestens 48 Stunden vor dem Termin angekündigt werden.'
              : 'Cancellations must be made at least 72 hours before the appointment. If cancelled later or in case of no-show, the deposit is forfeited. One free reschedule is available if notified at least 48 hours in advance.'}
          </p>

          <H2>{isDE ? '4. Gesundheit und Eignung' : '4. Health and suitability'}</H2>
          <p>
            {isDE
              ? 'Kunden müssen mindestens 18 Jahre alt sein. Sie versichern, dass keine medizinischen Kontraindikationen (Blutgerinnungsstörungen, Immunsuppression, aktive Hauterkrankungen an der Tätowierstelle, Schwangerschaft oder Stillzeit) vorliegen. Vira Linevych behält sich das Recht vor, einen Termin abzulehnen, wenn Zweifel an der Eignung bestehen.'
              : 'Clients must be at least 18 years old. They confirm that no medical contraindications exist (blood clotting disorders, immunosuppression, active skin conditions at the tattoo site, pregnancy or breastfeeding). Vira Linevych reserves the right to refuse an appointment if suitability is in doubt.'}
          </p>

          <H2>{isDE ? '5. Nachsorge-Haftungsausschluss' : '5. Aftercare disclaimer'}</H2>
          <p>
            {isDE
              ? 'Das Ergebnis eines Tattoos hängt wesentlich von der korrekten Nachsorge durch den Kunden ab. Vira Linevych gibt Nachsorgehinweise, übernimmt jedoch keine Haftung für Komplikationen, die durch unsachgemäße Pflege entstehen.'
              : 'The outcome of a tattoo depends significantly on the client following correct aftercare. Vira Linevych provides aftercare instructions but accepts no liability for complications arising from improper care.'}
          </p>

          <H2>{isDE ? '6. Urheberrecht' : '6. Copyright'}</H2>
          <p>
            {isDE
              ? 'Alle Tattoo-Designs bleiben bis zur vollständigen Bezahlung Eigentum von Vira Linevych. Das Urheberrecht an den Designs liegt dauerhaft bei Vira Linevych. Der Kunde erhält das Recht, das Design auf seinem Körper zu tragen.'
              : 'All tattoo designs remain the property of Vira Linevych until full payment. The copyright of designs permanently belongs to Vira Linevych. The client receives the right to wear the design on their body.'}
          </p>

          <H2>{isDE ? '7. Preise und Zahlung' : '7. Prices and payment'}</H2>
          <p>
            {isDE
              ? 'Preise werden individuell nach Beratung festgelegt. Zahlung erfolgt nach dem Termin in bar oder per Überweisung. Alle Preise verstehen sich in Euro inkl. MwSt., sofern zutreffend.'
              : 'Prices are determined individually after consultation. Payment is made after the appointment in cash or by bank transfer. All prices are in euros including VAT where applicable.'}
          </p>

          <H2>{isDE ? '8. Anwendbares Recht' : '8. Applicable law'}</H2>
          <p>
            {isDE
              ? 'Es gilt deutsches Recht. Gerichtsstand ist Berlin.'
              : 'German law applies. Jurisdiction is Berlin.'}
          </p>

          <p className="text-xs text-black/40 mt-10">
            {isDE ? 'Stand: ' : 'Last updated: '}
            {new Date().toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-GB', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
