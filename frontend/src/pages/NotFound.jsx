import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-32 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-bronze">404</p>
      <h1 className="mt-3 text-3xl text-charcoal">Page not found</h1>
      <p className="mt-2 text-charcoal/65">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="mt-6 rounded-full bg-charcoal px-6 py-3 text-sm text-offwhite">Back to Home</Link>
    </div>
  );
}
