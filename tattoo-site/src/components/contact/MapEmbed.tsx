export default function MapEmbed() {
  // OpenStreetMap iframe — GDPR compliant, no Google Maps
  // Update the bbox/marker coordinates to match the actual studio address
  return (
    <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-black/10">
      <iframe
        title="Studio location on OpenStreetMap"
        src="https://www.openstreetmap.org/export/embed.html?bbox=13.3,52.48,13.5,52.54&layer=mapnik"
        width="100%"
        height="100%"
        loading="lazy"
        className="border-0 grayscale"
        aria-label="Map showing studio location in Berlin"
      />
    </div>
  );
}
