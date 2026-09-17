import React from "react";
import CTASection from "../components/CTASection.jsx";

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "10+", label: "Design Experts" },
  { value: "5+", label: "Years of Experience" },
];

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wide text-bronze">About Eleix</p>
        <h1 className="mt-3 text-4xl text-charcoal md:text-5xl">
          Interiors built around how you actually live.
        </h1>
        <div className="mt-8 space-y-5 text-charcoal/75">
          <p>
            Eleix Interior Design is a Jaipur-based studio designing homes, offices and commercial
            spaces for clients who want something considered — not a look pulled off a catalog page.
            Every project starts with a conversation about how a space needs to work before we
            talk about how it should look.
          </p>
          <p>
            Our design philosophy is simple: good interiors solve problems quietly. Storage that
            disappears when you don't need it. Lighting that changes the mood of a room through the
            day. Materials chosen for how they age, not just how they photograph on day one.
          </p>
          <p>
            We manage the full journey end-to-end — concept, 3D visualization, material sourcing,
            on-site execution and handover — so you have one team accountable for the outcome,
            rather than juggling a designer, a contractor and a dozen vendors yourself.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-sand pt-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl text-charcoal">{s.value}</p>
              <p className="mt-1 text-sm text-charcoal/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
