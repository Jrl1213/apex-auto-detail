"use client";

import { useEffect, useRef, useState } from "react";
import { Brand } from "./brand";
import { whatsAppUrl } from "@/config/business";

const links = [
  ["Services", "#services"],
  ["Packages", "#packages"],
  ["Results", "#results"],
  ["Why APEX", "#about"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand-link"
          href="#top"
          aria-label="APEX Auto Detail, back to top"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="button button-header"
          href={whatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get a quote <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={menuToggleRef}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
        <a
          className="mobile-quote"
          href={whatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          Get a quote on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
