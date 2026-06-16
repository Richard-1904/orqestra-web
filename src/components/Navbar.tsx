import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../lib/useTheme";

const NAV_LINKS = [
  { label: "The Problem", href: "#the-problem" },
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Applications", href: "#applications" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-base-900/80 backdrop-blur-md border-b border-base-600/60" : "bg-transparent"
        }`}
    >
      <nav className="max-w-content mx-auto container-px flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-2.5 group">
          <LogoMark />
          <span className="font-display text-lg font-semibold tracking-tight text-ink-100">
            Orqestra
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-300 hover:text-ink-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-base-600 text-ink-300 hover:text-ink-100 hover:border-ink-500 transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>


          <a
            href="#early-access"
            className="inline-flex items-center rounded-full ..."
          >
            Early Access
          </a>
        </div>

        <button
          className="lg:hidden text-ink-100"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav >

      {
        open && (
          <div className="lg:hidden bg-base-900 border-t border-base-600/60 container-px py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-ink-300 hover:text-ink-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="self-start flex items-center gap-2 text-sm text-ink-300"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>


            <a
              href="#early-access"
              className="inline-flex items-center justify-center rounded-full bg-signal/10 border border-signal/30 px-5 py-3 text-sm font-medium text-signal"
              onClick={() => setOpen(false)}
            >
              Request Early Access
            </a>
          </div >
        )
      }
    </header >
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="6" r="2.5" fill="#5EEAD4" />
      <circle cx="6" cy="20" r="2" fill="#5B6B82" />
      <circle cx="22" cy="20" r="2" fill="#5B6B82" />
      <line x1="14" y1="6" x2="6" y2="20" stroke="#5EEAD4" strokeWidth="1.25" strokeOpacity="0.5" />
      <line x1="14" y1="6" x2="22" y2="20" stroke="#5EEAD4" strokeWidth="1.25" strokeOpacity="0.5" />
      <line x1="6" y1="20" x2="22" y2="20" stroke="#5B6B82" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 3" />
    </svg>
  );
}