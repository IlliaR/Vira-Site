type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props) {
  return {
    title: locale === 'de' ? 'Datenschutzerklärung — Vira Linevych' : 'Privacy Policy — Vira Linevych',
  };
}

export default function DatenschutzPage({ params: { locale } }: Props) {
  const isDE = locale === 'de';

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-sans font-semibold text-black uppercase tracking-widest text-xs mb-3 mt-10">{children}</h2>
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        <h1 className="font-display italic text-5xl text-black mb-12">
          {isDE ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </h1>

        <div className="space-y-4 font-sans text-sm text-black/80 leading-relaxed">
          <H2>{isDE ? '1. Verantwortliche Stelle' : '1. Controller'}</H2>
          <p>
            Vira Linevych · [Straße] · [PLZ] Berlin · {isDE ? 'E-Mail' : 'Email'}: [hello@yourdomain.de]
          </p>

          <H2>{isDE ? '2. Grundsätze der Verarbeitung' : '2. Principles of processing'}</H2>
          <p>
            {isDE
              ? 'Personenbezogene Daten werden nur erhoben, soweit dies zur Bereitstellung eines funktionsfähigen Angebots sowie unserer Inhalte und Leistungen erforderlich ist. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).'
              : 'Personal data is only collected to the extent necessary to provide a functional offering and our content and services. The legal basis is Art. 6(1)(b) GDPR (contract performance) or Art. 6(1)(a) GDPR (consent).'}
          </p>

          <H2>{isDE ? '3. Kontaktformular & Buchungsanfragen' : '3. Contact form & booking inquiries'}</H2>
          <p>
            {isDE
              ? 'Daten aus dem Kontaktformular (Name, E-Mail, Telefon, Tattoo-Idee, Größe, Körperstelle, bevorzugte Termine, ggf. Referenzbild) werden zur Bearbeitung der Anfrage gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Speicherdauer: 3 Jahre nach Abschluss des Vorgangs.'
              : 'Data from the contact form (name, email, phone, tattoo idea, size, placement, preferred dates, optional reference image) is stored to process your inquiry. Legal basis: Art. 6(1)(b) GDPR. Retention: 3 years after completion.'}
          </p>

          <H2>{isDE ? '4. Newsletter' : '4. Newsletter'}</H2>
          <p>
            {isDE
              ? 'Mit der Anmeldung zum Newsletter erteilst du deine ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Wir verwenden ein Double-Opt-in-Verfahren. Gespeichert werden: E-Mail-Adresse, Einwilligungszeitpunkt, IP-Adresse, Status. E-Mails werden über Resend (Resend Inc., USA) versendet — Standardvertragsklauseln gemäß Art. 46 DSGVO greifen. Du kannst dich jederzeit abmelden.'
              : 'By subscribing to the newsletter, you give explicit consent (Art. 6(1)(a) GDPR). We use a double opt-in process. Stored: email address, consent timestamp, IP address, status. Emails are sent via Resend (Resend Inc., USA) — standard contractual clauses per Art. 46 GDPR apply. You can unsubscribe at any time.'}
          </p>

          <H2>{isDE ? '5. Cookies (TTDSG § 25)' : '5. Cookies (TTDSG § 25)'}</H2>
          <p>
            {isDE
              ? 'Diese Website setzt ausschließlich technisch notwendige Cookies (Session-Cookie für den Admin-Bereich, Cookie-Einwilligungs-Speicherung im localStorage). Es werden keine Tracking- oder Analyse-Cookies gesetzt. Drittanbieter-Skripte werden erst nach ausdrücklicher Einwilligung geladen.'
              : 'This website uses only technically necessary cookies (session cookie for the admin area, consent preference stored in localStorage). No tracking or analytics cookies are set. Third-party scripts are only loaded after explicit consent.'}
          </p>

          <H2>{isDE ? '6. hCaptcha' : '6. hCaptcha'}</H2>
          <p>
            {isDE
              ? 'Das Kontaktformular verwendet hCaptcha (Intuition Machines Inc.). hCaptcha verarbeitet Daten zur Spam-Erkennung. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen: https://www.hcaptcha.com/privacy'
              : 'The contact form uses hCaptcha (Intuition Machines Inc.) for spam protection. Legal basis: Art. 6(1)(f) GDPR. More info: https://www.hcaptcha.com/privacy'}
          </p>

          <H2>{isDE ? '7. Hosting' : '7. Hosting'}</H2>
          <p>
            {isDE
              ? 'Die Website wird auf Servern in Deutschland gehostet (Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen). Es gilt der Auftragsverarbeitungsvertrag mit Hetzner. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.'
              : 'This website is hosted on servers in Germany (Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen). A data processing agreement with Hetzner applies. Legal basis: Art. 6(1)(f) GDPR.'}
          </p>

          <H2>{isDE ? '8. Selbst gehostete Schriften' : '8. Self-hosted fonts'}</H2>
          <p>
            {isDE
              ? 'Schriftarten werden ausschließlich von unserem eigenen Server geladen. Es findet keine Verbindung zu Google Fonts oder anderen CDN-Diensten statt.'
              : 'Fonts are loaded exclusively from our own server. No connection to Google Fonts or other CDN services is made.'}
          </p>

          <H2>{isDE ? '9. Rechte der betroffenen Personen' : '9. Your rights'}</H2>
          <p>
            {isDE
              ? 'Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Beschwerden richte bitte an die zuständige Aufsichtsbehörde.'
              : 'You have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20), and objection (Art. 21 GDPR). You may lodge a complaint with the competent supervisory authority.'}
          </p>

          <H2>{isDE ? '10. Kontakt zum Datenschutz' : '10. Contact for data protection'}</H2>
          <p>[hello@yourdomain.de]</p>

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
