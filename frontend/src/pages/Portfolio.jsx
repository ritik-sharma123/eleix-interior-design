import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import Modal from "../components/Modal.jsx";
import CTASection from "../components/CTASection.jsx";
import { projects, projectCategories } from "../data/projects.js";

export default function Portfolio() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-bronze">Portfolio</p>
        <h1 className="mt-3 max-w-2xl text-4xl text-charcoal md:text-5xl">Projects we're proud to have built.</h1>

        <div className="mt-8 flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                category === c ? "bg-charcoal text-offwhite" : "bg-sand/60 text-charcoal/70 hover:bg-sand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} onOpen={setActive} />)}
        </div>
      </section>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.name} wide>
        {active && (
          <div>
            <div className="aspect-[16/10] overflow-hidden rounded-xl">
              <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-wide text-bronze">{active.category} · {active.location}</p>
            <p className="mt-2 text-charcoal/75">{active.description}</p>
          </div>
        )}
      </Modal>

      <CTASection heading="Like what you see?" subtext="Let's talk about how we can bring the same quality to your space." />
    </>
  );
}
