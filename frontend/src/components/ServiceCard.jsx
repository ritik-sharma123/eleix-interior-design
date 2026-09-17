import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({ service }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm shadow-charcoal/5 transition hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={`${service.title} by Eleix Interior Design`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg text-charcoal">{service.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">{service.short}</p>
        <Link
          to={`/services/${service.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bronze"
        >
          Learn more <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
