import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import ConsultationForm from "../components/ConsultationForm.jsx";
import { buildWhatsAppLink } from "../components/WhatsAppButton.jsx";

const PHONE = import.meta.env.VITE_BUSINESS_PHONE || "+91 99999 99999";
const EMAIL = import.meta.env.VITE_BUSINESS_EMAIL || "hello@eleixinteriors.com";
const ADDRESS = import.meta.env.VITE_BUSINESS_ADDRESS || "Malviya Nagar, Jaipur, Rajasthan, India";

export default function Contact() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-sm font-medium uppercase tracking-wide text-bronze">Contact</p>
          <h1 className="mt-3 text-4xl text-charcoal md:text-5xl">Let's talk about your space.</h1>
          <p className="mt-4 text-charcoal/70">
            Share a few details and our design consultant will get back to you within 24 hours.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="rounded-full bg-sand/70 p-2.5"><Phone size={17} className="text-bronze" /></span>
              <a href={`tel:${PHONE}`} className="text-charcoal hover:text-bronze">{PHONE}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="rounded-full bg-sand/70 p-2.5"><MessageCircle size={17} className="text-bronze" /></span>
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-bronze">
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="rounded-full bg-sand/70 p-2.5"><Mail size={17} className="text-bronze" /></span>
              <a href={`mailto:${EMAIL}`} className="text-charcoal hover:text-bronze">{EMAIL}</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="rounded-full bg-sand/70 p-2.5"><MapPin size={17} className="text-bronze" /></span>
              <span className="text-charcoal">{ADDRESS}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-sand bg-white p-6 md:p-8">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
