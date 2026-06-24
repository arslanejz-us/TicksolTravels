'use client';

import { BRAND, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-navy-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-navy-950 font-bold text-lg">T</span>
              </div>
              <div>
                <h3 className="font-bold gradient-text">Ticksol</h3>
                <p className="text-[10px] text-navy-400 uppercase tracking-widest">Travel & Tours</p>
              </div>
            </div>
            <p className="text-navy-400 text-sm leading-relaxed mb-4">Premium corporate travel and global tour solutions. 30+ years of trusted excellence.</p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-lg bg-navy-800/50 flex items-center justify-center text-navy-400 hover:text-gold-400 hover:bg-gold-400/10 transition-all text-sm capitalize">{s[0].toUpperCase()}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}><a href={link.href} className="text-navy-400 hover:text-gold-400 transition-colors text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {['Flight Booking', 'Visa Processing', 'Hajj & Umrah', 'Hotel Booking', 'Tour Packages'].map((s) => (
                <li key={s}><a href="#services" className="text-navy-400 hover:text-gold-400 transition-colors text-sm">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-navy-400 text-sm flex items-center gap-2">📞 <a href={`tel:${BRAND.phone}`} className="hover:text-gold-400 transition-colors">{BRAND.phone}</a></li>
              <li className="text-navy-400 text-sm flex items-center gap-2">💬 <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">{BRAND.whatsapp}</a></li>
              <li className="text-navy-400 text-sm flex items-center gap-2">📧 <a href={`mailto:${BRAND.email}`} className="hover:text-gold-400 transition-colors">{BRAND.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 text-sm">© {currentYear} {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-navy-500 hover:text-navy-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-navy-500 hover:text-navy-300 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
