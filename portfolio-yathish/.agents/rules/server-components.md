# Architectural Rule: React Server Components (RSC) First

## Directive
All page sections, layout wrappers, and structural containers in the `src/` directory **MUST** be React Server Components (RSC) by default. The `'use client'` directive **MUST NOT** be placed at the section level unless strictly necessary for page-wide client state.

## Rules for Component Splitting

1. **Section Containers are Server Components**:
   - Files under `src/sections/*.tsx` (e.g. `HeroSection.tsx`, `AboutSection.tsx`, `ProjectsSection.tsx`, `ContactSection.tsx`) must be rendered on the server.
   - Do NOT add `'use client'` to section containers.

2. **Isolate Client Interactivity into Leaf Components**:
   - Extract interactive logic (hooks, state, event handlers, DOM references, animations, media APIs) into small, focused sub-components in `src/components/`.
   - Add `'use client'` ONLY to these leaf sub-components.
   - Examples:
     - `HeroVideoPlayer.tsx` for video playback controls and theme mutation observers.
     - `GreetingText.tsx` for time-based client mounting greetings.
     - `ResumeButton.tsx` for client-side download clicks and shine animations.

3. **Benefits**:
   - Reduces initial JavaScript payload sent to the browser.
   - Eliminates client hydration overhead for static markup, typography, and layout metadata.
   - Boosts Core Web Vitals (LCP, INP, CLS) and SEO indexability.
