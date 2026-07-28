const BRANDS = [
  'TOYOTA', 'HONDA', 'SUZUKI', 'HYUNDAI', 'KIA',
  'NISSAN', 'DAIHATSU', 'CHANGAN', 'MG', 'PROTON', 'ISUZU',
]

function BrandMarquee() {
  const track = [...BRANDS, ...BRANDS] // duplicated for seamless loop

  return (
   <section className="relative bg-paper py-10 overflow-hidden border-b border-ink/5">
      <p className="text-center font-mono text-[11px] tracking-widest text-slate/50 uppercase mb-6">
        Genuine &amp; compatible parts for all major makes
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex w-max brand-marquee-track">
          {track.map((brand, i) => (
            <div key={`${brand}-${i}`} className="flex items-center shrink-0 px-8">
              <span className="font-display font-semibold text-lg md:text-xl tracking-wide text-slate/40 hover:text-blueprint transition-colors duration-300">
                {brand}
              </span>
              <span className="ml-8 w-1 h-1 rounded-full bg-blueprint-light/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee