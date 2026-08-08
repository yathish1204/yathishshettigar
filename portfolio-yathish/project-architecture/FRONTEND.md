# Portfolio Frontend Specification

## 0. Product Goal

Build a premium, fast, accessible, SEO-friendly personal portfolio for Yathish Shettigar, positioned primarily for:

- HR recruiters
- Hiring managers
- Engineering managers
- Design managers
- Product leaders
- Potential clients

The portfolio should communicate within seconds:

1. Who Yathish is.
2. What he does.
3. His UX + frontend engineering capability.
4. What he has actually built.
5. His professional experience.
6. How to contact or hire him.

The experience should feel premium but never sacrifice readability or performance.

## 1. Core Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- GSAP
- Framer Motion / Motion
- Lenis
- Responsive images
- Playwright
- ESLint
- Strict TypeScript

## 2. UX Priority

Priority order:

1. Content clarity
2. Recruiter scanability
3. Performance
4. Accessibility
5. Navigation
6. Visual hierarchy
7. Animation

Animation must never become more important than content.

## 3. Public Information Architecture

Recommended sections:

Home
About
Selected Work / Projects
Experience
Skills
Certifications
Education
Hobbies / Interests
Contact

The navigation should remain simple.

Do not expose every database collection as a separate navbar item.

## 4. Homepage Story

Recommended order:

Hero
→ Value proposition
→ Selected work
→ About
→ Experience
→ Skills
→ Certifications
→ Personal interests
→ Contact

The homepage must be scannable.

Important information should appear early.

## 5. Hero Requirements

Hero must immediately communicate:

- Name
- UX Engineer / relevant professional title
- UX design + frontend development positioning
- Short compelling value proposition
- Primary CTA
- Secondary CTA

Potential CTA concepts:

- View selected work
- Download resume
- Let's talk

Avoid vague hero copy.

## 6. Project Presentation

Projects are the strongest proof of capability.

Project cards should communicate:

- Project name
- Short problem/value statement
- Role
- Technologies
- Relevant category
- Visual
- Optional outcome/impact
- CTA

Project detail pages should be case-study oriented.

Structure:

Hero
→ Overview
→ Role / responsibilities
→ Challenge
→ Research
→ Design process
→ Solution
→ Development
→ Outcome
→ Gallery
→ Technologies
→ Related projects

Do not make every section unnecessarily long.

## 7. Recruiter / HR Optimization

A recruiter should understand the portfolio quickly.

Surface:

- Years of experience
- Current/recent role
- Core skills
- Strongest projects
- Experience
- Resume
- Contact

Use concise copy.

Avoid walls of text.

Important achievements should be visually scannable.

## 8. Experience

Experience should clearly show:

- Company
- Role
- Dates
- Responsibilities
- Achievements
- Technologies

Prefer accomplishment-focused writing.

Example structure:

Problem / responsibility
→ Action
→ Result

Avoid generic statements such as "Worked on various projects."

## 9. Skills

Group skills logically.

Suggested groups:

UX / Product Design
Frontend
Backend
Database
Tools
Animation / Interaction

Do not represent skill level using misleading 95% progress bars.

Prefer:

- years
- project usage
- categories
- badges
- concise descriptions

## 10. Certifications

Show:

- Certification
- Issuer
- Date
- Credential
- Verification link when available

Avoid over-emphasizing certificates over actual work.

Projects and experience should remain the primary proof.

## 11. Accessibility

Requirements:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Visible focus states
- Accessible buttons/links
- Meaningful alt text
- Sufficient contrast
- Reduced motion support
- No animation-only communication
- Form labels
- Accessible error messages
- Touch-friendly controls

Respect:

`prefers-reduced-motion`

When reduced motion is enabled:

- Disable heavy scroll animations
- Remove unnecessary transforms
- Keep content fully accessible
- Preserve navigation and hierarchy

## 12. Animation Strategy

Use animation intentionally.

### GSAP

Use GSAP for:

- ScrollTrigger
- Complex timeline animation
- Scrub-based storytelling
- Pinned sections
- Large visual transitions
- Advanced motion sequences

### Framer Motion / Motion

Use for:

- Component entrance
- Hover interactions
- Micro-interactions
- Layout transitions
- Presence animations
- Simple state transitions

### Lenis

Use for:

- Smooth scrolling
- Coordinating scroll experience

Do not use GSAP, Motion, and Lenis for the same animation unnecessarily.

## 13. Scrub Animation

Scrub animation should be used for meaningful storytelling.

Example:

Scroll
→ visual progresses
→ text changes
→ project/story advances

Avoid:

- Excessive pinned sections
- Long forced scroll sequences
- Scroll hijacking
- Animations that prevent users from quickly navigating

Users must retain a sense of control.

## 14. Performance Rules

Target Core Web Vitals:

- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

Use:

- Next.js Server Components
- Optimized images
- Lazy loading
- Responsive images
- Minimal client JavaScript
- Code splitting
- Dynamic imports where useful
- Avoid unnecessary animation libraries per component
- Avoid huge video assets
- Avoid rendering hidden heavy DOM trees

Do not make the entire website a Client Component.

## 15. Mobile

Mobile is a first-class experience.

Test:

- 320px
- 375px
- 390px
- 414px
- tablet
- desktop
- large desktop

Ensure:

- No horizontal overflow
- Touch-friendly controls
- Readable typography
- Stable layout
- Animation remains performant

## 16. SEO

Every public page must have meaningful metadata.

Implement:

- Dynamic title
- Meta description
- Canonical URL
- Open Graph
- Social preview image
- robots.txt
- sitemap.xml
- Structured data / JSON-LD
- Semantic HTML

Project pages should have unique SEO metadata.

Example:

`US-FEX — UX Engineering Case Study | Yathish Shettigar`

Avoid generic titles like:

`Portfolio`

## 17. Structured Data

Use appropriate JSON-LD where relevant.

Potential schemas:

- Person
- WebSite
- CreativeWork / Project
- BreadcrumbList

Only include structured data that accurately represents visible page content.

Do not spam keywords.

## 18. Content SEO

Use natural keywords around:

- UX Engineer
- UX Design
- Frontend Development
- React
- Next.js
- JavaScript
- Product Design
- User Experience
- Design Systems

Do not keyword-stuff.

Content should sound human.

## 19. Loading States

Avoid generic full-page loading screens whenever possible.

Use:

- Skeletons
- Progressive image loading
- Suspense boundaries
- Local loading states

The user should see useful content as early as possible.

## 20. Error and Empty States

Every data-driven section should have a sensible fallback.

Examples:

- Projects unavailable
- No certifications
- Image unavailable
- API error
- Contact form error

Do not expose technical stack traces.

## 21. Navigation

Navigation should support:

- Clear active state
- Keyboard accessibility
- Mobile navigation
- Smooth anchor scrolling where appropriate
- Route transitions only where they improve UX

Do not make navigation dependent on animation completion.

## 22. Contact

Contact should make it easy for recruiters/managers to reach out.

Provide:

- Email
- LinkedIn
- GitHub where relevant
- Resume
- Contact form if implemented

Contact form requirements:

- Validation
- Accessible errors
- Spam protection
- Loading state
- Success state
- Failure state

## 23. Resume

Resume CTA should be visible from important areas.

The resume should be downloadable without forcing unnecessary navigation.

## 24. Visual Content

Use high-quality project visuals.

For each image:

- Correct aspect ratio
- Optimized format
- Descriptive alt text
- Lazy loading when appropriate
- Avoid layout shift

## 25. Component Architecture

Prefer reusable components:

- Navbar
- Button
- SectionHeading
- ProjectCard
- ProjectGrid
- ExperienceItem
- SkillGroup
- CertificationCard
- ImageReveal
- MagneticButton only if accessible
- ScrollProgress
- Footer

Avoid creating giant components.

## 26. Server vs Client Components

Default to Server Components.

Use Client Components when required for:

- GSAP
- Lenis
- Framer Motion interactions
- Browser APIs
- Interactive forms
- Stateful UI

Keep animated components isolated rather than turning entire pages into client components.

## 27. Playwright Testing

Create end-to-end tests for:

### Homepage

- Loads successfully
- Hero visible
- Navigation works
- Project links work
- Resume CTA works
- Contact CTA works

### Projects

- Project listing loads
- Project detail loads
- Correct slug resolves
- Published projects visible
- Draft projects unavailable publicly
- Navigation between projects works

### Responsive

Test mobile and desktop layouts.

### Accessibility

Test:

- Keyboard navigation
- Visible focus
- Important buttons/links
- Heading structure where practical

### Performance sanity

Ensure major pages do not fail due to console errors or failed network requests.

## 28. Browser Testing

Primary:

- Chromium
- Firefox
- WebKit

Mobile viewport tests should be included.

## 29. Analytics

If analytics is added:

- Respect privacy
- Do not block rendering
- Avoid collecting unnecessary personal information
- Track useful events only

Potential events:

- Resume download
- Project view
- Contact CTA
- External project link
- LinkedIn click

## 30. Definition of Done

Frontend is complete when:

- Portfolio is fully data-driven
- Public pages are responsive
- SEO metadata works
- Sitemap works
- Structured data is valid
- Accessibility basics are satisfied
- GSAP animations are purposeful
- Motion respects reduced-motion preferences
- Lenis works without breaking native navigation
- Performance is optimized
- No horizontal overflow
- Playwright critical flows pass
- Production build succeeds

## 31. Antigravity Execution Rules

1. Inspect repository before modifying anything.
2. Preserve working code.
3. Implement functionality before visual polish.
4. Do not invent portfolio data when CMS data exists.
5. Do not turn entire pages into Client Components just to use animation.
6. Keep animation logic isolated.
7. Test desktop and mobile after major changes.
8. Run lint/typecheck/build after significant milestones.
9. Run Playwright after completing user flows.
10. Fix console errors and failed network requests before considering a feature complete.
11. Prioritize UX clarity over visual effects.
12. Prefer progressive enhancement.
13. Keep components maintainable and reusable.
