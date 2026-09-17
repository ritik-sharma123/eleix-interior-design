import React from "react";
import ServiceCard from "../components/ServiceCard.jsx";
import CTASection from "../components/CTASection.jsx";
import { services } from "../data/services.js";

export default function Services() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-bronze">Services</p>
        <h1 className="mt-3 max-w-2xl text-4xl text-charcoal md:text-5xl">
          Interior design for every room, and every scale of project.
        </h1>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </section>
      <CTASection />
    </>
  );
}
