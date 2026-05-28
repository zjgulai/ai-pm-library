import { useState, useEffect } from "react";
import { Search, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "nav.home", href: "#hero" },
    { label: "nav.gallery", href: "#gallery" },
    { label: "nav.skills", href: "#skills" },
    { label: "nav.capabilities", href: "#capabilities" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(254,251,250,0.92)] backdrop-blur-xl shadow-[0_1px_0_rgba(237,229,226,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--fortune-400)] to-[var(--fortune-600)] flex items-center justify-center shadow-glow-red group-hover:scale-105 transition-transform duration-300">
            <span className="text-white text-xs font-bold">PF</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[var(--text-primary)] font-semibold text-sm tracking-tight">
              {t("brand.name") as string}
            </span>
            <span className="text-[var(--text-muted)] text-[10px] tracking-wide">
              {t("brand.tagline") as string}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[var(--text-secondary)] hover:text-[var(--fortune-500)] text-sm font-medium transition-colors duration-300 group"
            >
              {t(link.label) as string}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--fortune-400)] to-[var(--cinnabar)] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--fortune-500)] hover:bg-[var(--fortune-50)] border border-[var(--border-light)] hover:border-[var(--fortune-200)] transition-all duration-300"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "zh" ? "EN" : "中文"}
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="text-[var(--text-secondary)] hover:text-[var(--fortune-500)] hover:bg-[var(--fortune-50)] w-8 h-8"
          >
            <Search className="w-4 h-4" />
          </Button>

          <Button className="bg-gradient-to-r from-[var(--fortune-400)] to-[var(--fortune-500)] hover:from-[var(--fortune-500)] hover:to-[var(--fortune-600)] text-white text-sm font-medium px-5 h-9 rounded-full shadow-glow-red transition-all duration-300 hover:shadow-lg">
            {t("nav.getStarted") as string}
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[var(--text-primary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[rgba(254,251,250,0.98)] backdrop-blur-xl border-t border-[var(--border-light)]">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-[var(--fortune-500)] text-sm font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.label) as string}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-light)]">
              <button
                onClick={() => setLang(lang === "zh" ? "en" : "zh")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--fortune-500)] border border-[var(--border-light)]"
              >
                <Globe className="w-4 h-4" />
                {lang === "zh" ? "Switch to English" : "切换到中文"}
              </button>
              <Button className="flex-1 bg-gradient-to-r from-[var(--fortune-400)] to-[var(--fortune-500)] text-white rounded-full">
                {t("nav.getStarted") as string}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
