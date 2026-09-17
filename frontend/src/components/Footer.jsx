import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const PHONE = import.meta.env.VITE_BUSINESS_PHONE || "+91 99999 99999";
const EMAIL = import.meta.env.VITE_BUSINESS_EMAIL || "hello@eleixinteriors.com";
const ADDRESS = import.meta.env.VITE_BUSINESS_ADDRESS || "Malviya Nagar, Jaipur, Rajasthan, India";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-offwhite/80">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-offwhite">
              Eleix<span className="text-gold">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Premium interior design for homes, offices and commercial spaces — designed around how you actually live and work.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-offwhite/70 hover:text-gold"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook" className="text-offwhite/70 hover:text-gold"><Facebook size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="text-offwhite/70 hover:text-gold"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-offwhite">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link to="/admin/login" className="hover:text-gold">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-offwhite">Services</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/home-interior-design" className="hover:text-gold">Home Interior Design</Link></li>
              <li><Link to="/services/modular-kitchen" className="hover:text-gold">Modular Kitchen</Link></li>
              <li><Link to="/services/office-interior" className="hover:text-gold">Office Interior</Link></li>
              <li><Link to="/services" className="hover:text-gold">All Services</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-offwhite">Get in touch</p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 shrink-0" /> <a href={`tel:${PHONE}`} className="hover:text-gold">{PHONE}</a></li>
              <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 shrink-0" /> <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a></li>
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> <span>{ADDRESS}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-offwhite/10 pt-6 text-xs text-offwhite/50 md:flex-row">
          <p>© {new Date().getFullYear()} Eleix Interior Design. All rights reserved.</p>
          <p>Serving Jaipur & surrounding areas.</p>
        </div>
      </div>
    </footer>
  );
}
