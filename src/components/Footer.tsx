export function Footer() {
  return (
    <footer id="about" className="border-t border-base-600/60 py-12">
      <div className="max-w-content mx-auto container-px flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="6" r="2.5" fill="#5EEAD4" />
            <circle cx="6" cy="20" r="2" fill="#5B6B82" />
            <circle cx="22" cy="20" r="2" fill="#5B6B82" />
            <line x1="14" y1="6" x2="6" y2="20" stroke="#5EEAD4" strokeWidth="1.25" strokeOpacity="0.5" />
            <line x1="14" y1="6" x2="22" y2="20" stroke="#5EEAD4" strokeWidth="1.25" strokeOpacity="0.5" />
            <line x1="6" y1="20" x2="22" y2="20" stroke="#5B6B82" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 3" />
          </svg>
          <span className="font-display text-sm font-semibold text-ink-100">Orqestra</span>
        </div>

        <p className="text-sm text-ink-700 text-center">
          © {new Date().getFullYear()} Orqestra. Building confidence in organizational knowledge.
        </p>

        <div className="flex items-center gap-6 text-sm text-ink-500">
          <a href="#" className="hover:text-ink-100 transition-colors">Privacy</a>
          <a href="#" className="hover:text-ink-100 transition-colors">Terms</a>
          <a href="#" className="hover:text-ink-100 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
