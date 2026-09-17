import React from "react";
import { Link } from "react-router-dom";

export default function CTASection({
  heading = "Ready to start your project?",
  subtext = "Tell us about your space and get a free, no-obligation consultation with our design team.",
  ctaLabel = "Get Free Consultation",
  ctaTo = "/contact",
}) {
  return (
    <section className="bg-espresso">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
        <h2 className="max-w-xl text-3xl text-offwhite md:text-4xl">{heading}</h2>
        <p className="max-w-lg text-offwhite/70">{subtext}</p>
        <Link
          to={ctaTo}
          className="mt-2 rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-charcoal transition hover:bg-offwhite"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
