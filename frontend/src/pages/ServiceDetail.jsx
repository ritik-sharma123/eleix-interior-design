import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import ConsultationForm from "../components/ConsultationForm.jsx";
import { services } from "../data/services.js";

const highlights = [
  "Free initial consultation and site assessment",
  "Custom 3D visualization before execution begins",
  "Premium materials with transparent, itemized pricing",
  "A single point of contact throughout your project",
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <nav className="mb-6 text-sm text-charcoal/50">
        <Link to="/services" className="hover:text-bronze">Services</Link> / <span className="text-charcoal">{service.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl">
            <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
          </div>
          <h1 className="mt-6 text-3xl text-charcoal md:text-4xl">{service.title}</h1>
          <p className="mt-3 text-charcoal/70">{service.short}</p>

          <ul className="mt-8 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-charcoal/75">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-bronze" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-sand bg-white p-6 lg:sticky lg:top-24">
            <h2 className="text-lg text-charcoal">Get a Quote for {service.title}</h2>
            <p className="mt-1.5 text-sm text-charcoal/60">Tell us about your space — we'll get back within 24 hours.</p>
            <div className="mt-6">
              <ConsultationForm defaultService={service.title} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
