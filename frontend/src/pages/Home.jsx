import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Gem, Clock, HeartHandshake, ArrowUpRight } from "lucide-react";
import Hero from "../components/Hero.jsx";
import CTASection from "../components/CTASection.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import QuickCallbackModal from "../components/QuickCallbackModal.jsx";
import { services } from "../data/services.js";
import { projects } from "../data/projects.js";
import { testimonials } from "../data/testimonials.js";
import { processSteps } from "../data/process.js";
import { useReveal } from "../hooks/useReveal.js";

const reasons = [
  { icon: Sparkles, title: "Personalized Designs", text: "Every concept is built around your taste, not a fixed catalog." },
  { icon: ShieldCheck, title: "Transparent Pricing", text: "Clear, itemized quotes with no hidden costs at any stage." },
  { icon: Gem, title: "Quality Materials", text: "We source durable, premium materials from trusted vendors." },
  { icon: Clock, title: "On-Time Delivery", text: "Structured project timelines that we hold ourselves to." },
  { icon: HeartHandshake, title: "Dedicated Support", text: "A single point of contact from consultation to handover." },
];

export default function Home() {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const revealRef = useReveal();

  return (
    <>
      <Hero />

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl text-charcoal md:text-4xl">Our Interior Design Services</h2>
            <p className="mt-2 max-w-lg text-charcoal/65">From a single room to a full home, we handle every scale of interior project.</p>
          </div>
          <Link to="/services" className="hidden items-center gap-1 text-sm font-medium text-bronze md:flex">
            View all services <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-sand/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-3xl text-charcoal md:text-4xl">Why Homeowners Choose Eleix</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl bg-white p-5">
                <r.icon className="text-bronze" size={22} strokeWidth={1.75} />
                <h3 className="mt-4 text-base text-charcoal">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="text-3xl text-charcoal md:text-4xl">How We Work</h2>
        <p className="mt-2 max-w-lg text-charcoal/65">A clear, seven-step process from first call to final handover.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-sand p-5">
              <span className="text-xs font-medium text-bronze">Step {i + 1}</span>
              <step.icon className="mt-2 text-charcoal" size={22} strokeWidth={1.75} />
              <h3 className="mt-3 text-base text-charcoal">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio preview */}
      <section ref={revealRef} className="reveal bg-charcoal py-16 text-offwhite md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl md:text-4xl">Recent Projects</h2>
              <p className="mt-2 max-w-lg text-offwhite/65">A few of the spaces we've recently designed and built.</p>
            </div>
            <Link to="/portfolio" className="flex items-center gap-1 text-sm font-medium text-gold">
              View full portfolio <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <Link key={p.id} to="/portfolio" className="group block overflow-hidden rounded-2xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-gold">{p.category}</p>
                  <p className="mt-1 text-base">{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="text-3xl text-charcoal md:text-4xl">What Our Clients Say</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </section>

      <CTASection />

      <button
        onClick={() => setCallbackOpen(true)}
        className="fixed bottom-24 right-5 z-30 hidden rounded-full bg-white px-4 py-2.5 text-xs font-medium text-charcoal shadow-lg shadow-charcoal/10 md:block md:right-8"
      >
        Get a Callback
      </button>
      <QuickCallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
}
