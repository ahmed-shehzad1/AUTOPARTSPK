import toyotaLogo from '../../assets/images/toyota-logo-2020-europe-download (3).png'
import hondaLogo from '../../assets/images/honda-logo-2000-full-download.png'
import suzukiLogo from '../../assets/images/Suzuki-logo-5000x2500.png'
import hyundaiLogo from '../../assets/images/hyundai-logo-2011-download.png'
import kiaLogo from '../../assets/images/Kia-logo-2560x1440.png'
import nissanLogo from '../../assets/images/nissan-logo-2020-black.png'
import daihatsuLogo from '../../assets/images/Daihatsu-logo-1997-1280x233.png'
import changanLogo from '../../assets/images/Changan-logo-2010-2560x1440.png'
import mgLogo from '../../assets/images/MG-logo-red-2010-1920x1080.png'
import protonLogo from '../../assets/images/Proton-logo-2016-2048x2048.png'
import isuzuLogo from '../../assets/images/Isuzu-logo-1991-3840x2160.png'
import mazdaLogo from '../../assets/images/mazda-logo-2018-vertical-download.png'
import mitsubishiLogo from '../../assets/images/Mitsubishi-logo-2000x2500.png'
import subaruLogo from '../../assets/images/subaru-logo-2019-download.png'
import fordLogo from '../../assets/images/ford-logo-2017-download.png'
import audiLogo from '../../assets/images/audi-logo-2016-download.png'
import bmwLogo from '../../assets/images/bmw-logo-2020-gray-download.png'

const BRANDS = [
  { name: 'TOYOTA', src: toyotaLogo },
  { name: 'HONDA', src: hondaLogo },
  { name: 'SUZUKI', src: suzukiLogo },
  { name: 'HYUNDAI', src: hyundaiLogo },
  { name: 'KIA', src: kiaLogo },
  { name: 'NISSAN', src: nissanLogo },
  { name: 'DAIHATSU', src: daihatsuLogo },
  { name: 'CHANGAN', src: changanLogo },
  { name: 'MG', src: mgLogo },
  { name: 'PROTON', src: protonLogo },
  { name: 'ISUZU', src: isuzuLogo },
  { name: 'MAZDA', src: mazdaLogo },
  { name: 'MITSUBISHI', src: mitsubishiLogo },
  { name: 'SUBARU', src: subaruLogo },
  { name: 'FORD', src: fordLogo },
  { name: 'AUDI', src: audiLogo },
  { name: 'BMW', src: bmwLogo },
]

function BrandMarquee() {
  // Tripled array to ensure unbroken infinite loop across ultra-wide monitors
  const track = [...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <section className="relative py-12 overflow-hidden border-y border-slate-200/80 bg-slate-50/50">
      
      {/* 1. Ambient Background Layer (Tech Grid + Soft Radial Glow) */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-purple-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* 2. Header & Live Indicator Badge */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200 shadow-xs backdrop-blur-md mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] tracking-widest text-slate-600 uppercase font-bold">
            OEM Compatibility Verified
          </span>
        </div>

        <h2 className="text-center font-sans font-bold text-xs tracking-[0.25em] text-slate-500 uppercase">
          Genuine &amp; Compatible Parts For All Major Makes
        </h2>
      </div>

      {/* 3. Marquee Track Container with Smooth Edge Gradients */}
      <div
        className="relative overflow-hidden py-4"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="flex w-max brand-marquee-track hover:[animation-play-state:paused] items-center gap-6">
          {track.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="group relative flex items-center shrink-0 cursor-pointer"
            >
              {/* Floating Glassmorphic Pill Card */}
              <div className="relative flex items-center justify-center px-8 py-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:bg-white group-hover:border-indigo-300 group-hover:shadow-[0_12px_24px_-6px_rgba(99,102,241,0.18)]">
                
                {/* Micro Light Reflection Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

                {/* Logo Frame */}
                <div className="h-9 w-28 flex items-center justify-center relative z-10">
                  <img
                    src={brand.src}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-xs opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>

              {/* Accessible Hidden Text */}
              <span className="sr-only">{brand.name}</span>

              {/* Inter-card Futuristic Dot Divider */}
              <div className="ml-6 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 group-hover:scale-125 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee