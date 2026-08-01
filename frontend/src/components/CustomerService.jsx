import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';

const CustomerService = () => {
  // Client ka exact address aur Google Maps URL
  const shopAddress = "Shop no 1, Marol Pipeline Rd, opposite sai residency, Sai Nagar, Ashok Nagar, Andheri East, Mumbai, Maharashtra 400059";
  const googleMapsUrl = "https://www.google.com/maps/dir//Cake+bakers,+Shop+no+1,+Marol+Pipeline+Rd,+opposite+sai+residency,+Sai+Nagar,+Ashok+Nagar,+Andheri+East,+Mumbai,+Maharashtra+400059/@19.0815074,72.8783527,11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7c94aa1db89fb:0x5bbc7f1dc60a590!2m2!1d72.8709825!2d19.1091738?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-amber-900/30">
      <div className="bg-[#1A0C08] border border-amber-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block mb-3">
            📍 Visit Our Bakery
          </span>
          <h2 className="text-3xl font-black font-serif text-amber-100">
            Store Location & Contact
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/60 mt-2">
            Drop by our bakery for fresh oven-baked cakes or order online for direct doorstep delivery.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Shop Address & Map Link */}
          <div className="bg-[#24120C] border border-amber-900/40 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-amber-100 mb-2">Bakery Address</h3>
              <p className="text-xs text-amber-200/70 leading-relaxed mb-4">
                {shopAddress}
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              Get Directions on Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Contact Numbers */}
          <div className="bg-[#24120C] border border-amber-900/40 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-amber-100 mb-2">Order & Inquiries</h3>
              <p className="text-xs text-amber-200/70 leading-relaxed mb-4">
                Call or WhatsApp us directly for custom cake orders or event bookings.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href="tel:7400400725"
                className="text-xs font-bold text-amber-300 bg-[#120805] py-2 px-3 rounded-lg border border-amber-900/40 hover:border-amber-500/50 transition flex items-center justify-between"
              >
                <span>📞 +91 7400400725</span>
                <span className="text-[10px] text-amber-400/60 uppercase">Call Now</span>
              </a>
              <a
                href="tel:7054508563"
                className="text-xs font-bold text-amber-300 bg-[#120805] py-2 px-3 rounded-lg border border-amber-900/40 hover:border-amber-500/50 transition flex items-center justify-between"
              >
                <span>📞 +91 7054508563</span>
                <span className="text-[10px] text-amber-400/60 uppercase">Call Now</span>
              </a>
            </div>
          </div>

          {/* Card 3: Opening Hours */}
          <div className="bg-[#24120C] border border-amber-900/40 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-amber-100 mb-2">Working Hours</h3>
              <p className="text-xs text-amber-200/70 leading-relaxed mb-4">
                We bake fresh every morning!
              </p>
            </div>

            <div className="bg-[#120805] p-3 rounded-xl border border-amber-900/40 text-xs space-y-1.5 text-amber-200/80">
              <div className="flex justify-between">
                <span>Mon - Sat:</span>
                <span className="font-bold text-amber-300">9:00 AM - 10:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-bold text-amber-300">9:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CustomerService;