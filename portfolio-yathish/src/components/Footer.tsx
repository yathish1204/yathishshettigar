import Link from "next/link";
import { Profile } from "@/types";
import { getFooterSocialItems, FOOTER_NAV_LINKS } from "@/constants/data";
import { YathishAnimatedTitle } from "@/components/YathishAnimatedTitle";

export function Footer({ profile }: { profile: Profile }) {
  const socialItems = getFooterSocialItems(profile);

  return (
    <footer className="w-full bg-slate-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-8 md:py-10 text-zinc-600 dark:text-zinc-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-[#B45309] dark:hover:text-[#FBBF24] transition-colors"
            >
              {profile.name}
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 md:mt-2 max-w-md leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <nav className="space-y-3" aria-label="Footer navigation">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#B45309] dark:hover:text-[#FBBF24] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Share Icons (4 Per Row Max with Tooltip) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 font-mono">
              Connect
            </h4>

            {/* Flex layout with comfortable breathing gap between icons */}
            <div
              className="flex flex-wrap items-center gap-3.5 sm:gap-4"
              role="list"
              aria-label="Social media links"
            >
              {socialItems.map((item) => (
                <div key={item.name} className="relative group" role="listitem">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center hover:text-[#B45309] dark:hover:text-[#FBBF24] hover:border-[#B45309] dark:hover:border-[#FBBF24] transition-all shadow-sm hover:scale-110 cursor-pointer"
                  >
                    {item.icon}
                  </a>
                  {/* Floating Hover Tooltip — decorative */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] font-mono font-bold rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20"
                  >
                    {item.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated YATHISH Title (Visible only on medium screens and above) */}
        <YathishAnimatedTitle />

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-center text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <span
              className="text-zinc-300 dark:text-zinc-800"
              aria-hidden="true"
            >
              •
            </span>
            <Link
              href="/admin"
              className="text-zinc-400 dark:text-zinc-600 hover:text-[#B45309] dark:hover:text-[#FBBF24] transition-colors font-mono text-[11px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#FBBF24] rounded px-1"
              aria-label="Admin Portal link"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
