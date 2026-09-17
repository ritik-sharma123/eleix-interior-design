import React from "react";

export default function ProjectCard({ project, onOpen }) {
  return (
    <button
      onClick={() => onOpen(project)}
      className="group block w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm shadow-charcoal/5 transition hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} — ${project.category} interior design in ${project.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wide text-bronze">{project.category} · {project.location}</p>
        <h3 className="mt-1 text-lg text-charcoal">{project.name}</h3>
        <p className="mt-1.5 text-sm text-charcoal/65 line-clamp-2">{project.description}</p>
      </div>
    </button>
  );
}
