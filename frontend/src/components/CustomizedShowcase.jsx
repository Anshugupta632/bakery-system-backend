import { Sparkles, MessageSquare, Camera } from 'lucide-react';

// Import local real custom cake images
import familyPhotoImg from '../assets/customized/family-photo.jpg';
import oreoDripImg from '../assets/customized/oreo-drip.png';
import barbieThemeImg from '../assets/customized/barbie-theme.jpg';
import monkeySafariImg from '../assets/customized/monkey-safari.png';
import sofiaPrincessImg from '../assets/customized/sofia-princess.jpg';

const customCakesList = [
  {
    id: 'custom-1',
    title: 'Custom Family Photo Cake',
    tag: 'Edible Photo Print',
    description: 'Personalized edible sugar sheet photo print on rich chocolate sponge.',
    image: familyPhotoImg,
  },
  {
    id: 'custom-2',
    title: '2-Tier Oreo Drip Cake',
    tag: 'Tier Cake',
    description: 'Double layer chocolate vanilla drip loaded with crunchy Oreo cookies.',
    image: oreoDripImg,
  },
  {
    id: 'custom-3',
    title: 'Barbie Theme Birthday Cake',
    tag: 'Theme & Toppers',
    description: 'Dual tier pink rosette cream finish with custom toppers for kids.',
    image: barbieThemeImg,
  },
  {
    id: 'custom-4',
    title: 'Monkey Safari Fondant Cake',
    tag: '3D Fondant Work',
    description: 'Handcrafted 3D fondant characters with name bunting flags.',
    image: monkeySafariImg,
  },
  {
    id: 'custom-5',
    title: 'Sofia Princess Cream Cake',
    tag: 'Character Edible Print',
    description: 'Custom princess theme with piping whipped cream dress design.',
    image: sofiaPrincessImg,
  },
];

export default function CustomizedShowcase() {
  return (
    <section id="customized" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-amber-900/40">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Handcrafted Custom Bakes
        </span>
        <h2 className="text-3xl sm:text-4xl font-black font-serif text-amber-100 tracking-tight mb-3">
          We Design Any Custom Cake You Imagine 🎨
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/60 leading-relaxed">
          Aapki pasand ki photo, 3D fondant theme, ya multi-tier celebration cakes — hum exact aapke design ke hisaab se customize karke bake karte hain!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {customCakesList.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#1F0E09] border border-amber-900/50 rounded-3xl p-4 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition duration-300 group overflow-hidden"
          >
            <div>
              {/* Image Container */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4 bg-stone-900 border border-amber-900/30">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <span className="absolute top-2.5 right-2.5 text-[10px] bg-amber-500 text-stone-950 font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold font-serif text-amber-100 mb-1">{item.title}</h3>
              <p className="text-xs text-amber-200/60 leading-relaxed mb-4">{item.description}</p>
            </div>

            {/* Direct Custom Quote Action */}
            <a
              href={`https://wa.me/917400400725?text=Hi%20CakeBakers,%20I%20want%20to%20order%20a%20customized%20cake%20like%20"${encodeURIComponent(item.title)}"`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/30 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Camera className="w-4 h-4" /> Order Similar Custom Cake
            </a>
          </div>
        ))}
      </div>

      {/* Upload Custom Design CTA Box */}
      <div className="bg-gradient-to-r from-[#2A150D] via-[#1E0D08] to-[#2A150D] border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-black font-serif text-amber-100 mb-2">
            Have Your Own Photo or Custom Design Idea? 📱
          </h3>
          <p className="text-xs sm:text-sm text-amber-200/70 max-w-xl mx-auto mb-6">
            Aap apni photo, Pinterest screenshot, ya design idea seedhe WhatsApp par bhej kar instant price estimate aur slot book karein!
          </p>

          <a
            href="https://wa.me/917400400725?text=Hi%20CakeBakers,%20I%20have%20my%20own%20custom%20cake%20photo/design%20to%20share"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl transition cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" /> Send Your Photo on WhatsApp
          </a>
        </div>
      </div>

    </section>
  );
}