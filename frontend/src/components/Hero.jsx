import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-bronze">Interior Design Studio · Jaipur</p>
          <h1 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl md:text-[3.4rem] md:leading-[1.1]">
            Designing Spaces That Feel Like Home.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/70 md:text-lg">
            Premium home and office interior design solutions crafted around your lifestyle, personality and vision.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-full bg-charcoal px-7 py-3.5 text-center text-sm font-medium text-offwhite transition hover:bg-espresso"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/portfolio"
              className="rounded-full border border-charcoal/20 px-7 py-3.5 text-center text-sm font-medium text-charcoal transition hover:border-charcoal/40"
            >
              Explore Our Designs
            </Link>
          </div>
          <div className="mt-10 flex gap-8 border-t border-charcoal/10 pt-6">
            <div>
              <p className="text-2xl text-charcoal">100+</p>
              <p className="text-xs text-charcoal/55">Projects Delivered</p>
            </div>
            <div>
              <p className="text-2xl text-charcoal">50+</p>
              <p className="text-xs text-charcoal/55">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl text-charcoal">5+</p>
              <p className="text-xs text-charcoal/55">Years Experience</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-charcoal/10">
            <img
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1400&auto=format&fit=crop"
              alt="Premium living room interior designed by Eleix Interior Design"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl bg-white p-4 shadow-lg shadow-charcoal/10 sm:block">
            <p className="text-sm font-medium text-charcoal">"Feels like us, not a showroom."</p>
            <p className="mt-1 text-xs text-charcoal/55">— Anjali R., Jaipur</p>
          </div>
        </div>
      </div>
    </section>
  );
}
