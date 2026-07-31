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
  const track = [...BRANDS, ...BRANDS] // duplicated for seamless loop

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 py-6 overflow-hidden border-b border-slate-200/60">
      <p className="text-center font-sans font-bold text-[11px] tracking-widest text-slate-500 uppercase mb-5">
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
        <div className="flex w-max brand-marquee-track hover:[animation-play-state:paused]">
          {track.map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="flex items-center shrink-0 px-8 group cursor-pointer">
              
              <div className="h-10 w-24 flex items-center justify-center">
                {/* STRUCTURE CHANGE: Removed 'grayscale' and 'opacity-40'. Set baseline to 'opacity-90' for full color visibility */}
                <img 
                  src={brand.src} 
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                />
              </div>

              {/* Visually hidden text fallback to maintain accessibility for screen readers while displaying the logos */}
              <span className="sr-only">{brand.name}</span>

              {/* Separator dot */}
              <span className="ml-8 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-300/50 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee