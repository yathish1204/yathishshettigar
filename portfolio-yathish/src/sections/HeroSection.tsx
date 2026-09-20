import { Profile } from "@/types";
import { HeroVideoPlayer } from "@/components/HeroVideoPlayer";
import { GreetingText } from "@/components/GreetingText";
import { ResumeButton } from "@/components/ResumeButton";

export function HeroSection({ profile }: { profile: Profile }) {
  const socialItems = [
    {
      name: "GitHub",
      href: profile.socialLinks?.github || "https://github.com/yathish1204",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href:
        profile.socialLinks?.linkedin ||
        "https://linkedin.com/in/yathish-shettigar",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href:
        profile.socialLinks?.instagram ||
        "https://www.instagram.com/y_shettigar_",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Behance",
      href:
        profile.socialLinks?.behance ||
        "https://www.behance.net/yathishshettigar",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.813 3-3.111 0-5.385-2.221-5.385-5.518 0-3.477 2.371-5.482 5.253-5.482 3.167 0 4.88 2.155 4.88 5.241 0 .422-.053.844-.078 1.055h-7.391c.148 1.547 1.306 2.38 2.734 2.38 1.258 0 2.062-.57 2.384-1.348h2.416zm-4.966-5.414c-1.163 0-2.03.684-2.261 1.942h4.481c-.085-1.196-.89-1.942-2.22-1.942zm-10.76-6.586h-8.000v14h7.458c2.909 0 5.042-1.621 5.042-4.148 0-1.785-1.026-3.08-2.457-3.565 1.066-.486 1.776-1.549 1.776-3.036 0-2.115-1.662-3.251-3.819-3.251zm-4.789 2.456h2.247c1.173 0 1.907.502 1.907 1.394 0 .977-.82 1.488-2.029 1.488h-2.125v-2.882zm0 5.214h2.518c1.328 0 2.148.553 2.148 1.572 0 1.139-.938 1.697-2.277 1.697h-2.389v-4.269z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-72px)] sm:h-[calc(100vh-72px)] flex flex-col justify-start sm:justify-center py-0 sm:py-8 bg-slate-50 dark:bg-zinc-950 transition-colors overflow-hidden"
    >
      {/* Top Video Container (Client Component for video playback & controls) */}
      <HeroVideoPlayer profile={profile} />

      {/* Horizontal Linear Gradient Mask */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-950 dark:via-zinc-950/60 to-transparent pointer-events-none z-10" />

      {/* Bottom Linear Gradient Mask */}
      <div className="hidden sm:block absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40 to-transparent pointer-events-none z-10" />

      {/* Main Hero Content (Server Rendered HTML) */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 py-6 sm:px-6 lg:px-8 w-full -mt-6 sm:mt-0 bg-slate-50 dark:bg-zinc-950 sm:bg-transparent sm:dark:bg-transparent rounded-t-3xl sm:rounded-none transition-colors">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          {/* Greeting & Name */}
          <div className="space-y-1 sm:space-y-2">
            <GreetingText />
            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans leading-tight sm:leading-[1.15] pb-0.5 sm:pb-1">
              <span className="text-gradient-accent">{profile.name}</span>
            </h1>
          </div>

          {/* Role */}
          <p className="text-base sm:text-xl md:text-2xl font-medium text-zinc-800 dark:text-zinc-200 tracking-tight pt-0.5 sm:pt-1">
            {profile.title}
          </p>

          {/* Small Intro */}
          <p className="text-xs sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {profile.tagline}
          </p>

          {/* CTA & Social Links */}
          <div className="pt-1 sm:pt-2 space-y-4 sm:space-y-6">
            <div>
              <ResumeButton />
            </div>

            {/* Social Share Icons Row */}
            <div className="flex items-center gap-3 pt-2">
              {socialItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-[#B45309] dark:hover:text-[#FBBF24] hover:border-[#B45309] dark:hover:border-[#FBBF24] transition-all hover:scale-110 shadow-sm backdrop-blur-sm flex items-center justify-center cursor-pointer"
                  >
                    {item.icon}
                  </a>
                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-mono font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-40">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
