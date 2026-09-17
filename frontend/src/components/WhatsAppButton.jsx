import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919999999999";

export function buildWhatsAppLink(customMessage) {
  const message = customMessage || "Hello Eleix Interior Design, I would like to discuss my interior design project.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Floating button used site-wide.
export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Eleix Interior Design on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}

// Inline variant for use inside CTAs / cards.
export function WhatsAppInlineLink({ children, message, className = "" }) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
