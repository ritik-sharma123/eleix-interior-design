import React from "react";
import { Star } from "lucide-react";

export default function TestimonialCard({ t }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-sand bg-white p-6">
      <div className="flex gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} strokeWidth={1.5} />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/80">"{t.text}"</p>
      <div className="mt-5 border-t border-sand pt-4">
        <p className="text-sm font-medium text-charcoal">{t.name}</p>
        <p className="text-xs text-charcoal/55">{t.location} · {t.project}</p>
      </div>
    </div>
  );
}
