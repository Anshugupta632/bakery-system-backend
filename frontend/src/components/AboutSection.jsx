import { Sparkles, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: '100% Freshly Baked',
      description: 'Har order par hum fresh ingredients aur pure love ke saath baking start karte hain.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-400" />,
      title: 'Custom Name Icing',
      description: 'Apne loved ones ke liye cake ke upar custom icing message/name likhwayein.',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: 'On-Time Slot Delivery',
      description: 'Aapke birthday ya party slot ke hisaab se doorstep delivery guaranteed.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: 'Hygiene & Quality',
      description: 'Strict quality control aur hygienic kitchen standards ke saath prepared.',
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-amber-900/30">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block mb-3">
          📖 Our Story
        </span>
        <h2 className="text-3xl sm:text-4xl font-black font-serif text-amber-100 mb-3">
          About CakeBakers
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/60 leading-relaxed">
          Humara mission har celebration ko aur mitha banana hai. High-quality ingredients aur handcrafted recipes ke saath, CakeBakers aap tak delivering Happiness laata hai.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div key={idx} className="bg-[#1A0C08] border border-amber-900/40 p-6 rounded-3xl hover:border-amber-500/40 transition duration-300">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-amber-100 mb-1">{item.title}</h3>
            <p className="text-xs text-amber-200/60 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}