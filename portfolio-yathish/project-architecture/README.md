# Yathish Shettigar — Backend-Driven Portfolio

## Product

A premium, SEO-friendly, backend-driven personal portfolio and lightweight CMS.

## Audience

Primary audience:

- HR recruiters
- Hiring managers
- Engineering managers
- Design managers
- Product leaders

## Core Positioning

UX Engineer combining:

- UX / Product Design
- Frontend Engineering
- React
- Next.js
- JavaScript
- Interaction / Motion

## Architecture

Next.js full-stack application:

Public Portfolio
→ Next.js
→ Server Components / Route Handlers / Server Actions
→ Service Layer
→ Mongoose
→ MongoDB

Admin CMS
→ Authentication
→ Protected server operations
→ MongoDB

## Documents

- `BACKEND.md` — backend architecture and implementation rules
- `FRONTEND.md` — public frontend architecture, UX, SEO, animation and performance
- `FUNCTIONALITY.md` — behavior and acceptance requirements

## Implementation Order

### Phase 1 — Foundation

1. Create Next.js project
2. Configure TypeScript
3. Configure environment variables
4. Connect MongoDB
5. Create Mongoose models
6. Add Zod
7. Establish service layer

### Phase 2 — Backend

1. Project CRUD
2. Experience CRUD
3. Skills CRUD
4. Certifications CRUD
5. Education CRUD
6. Hobbies CRUD
7. Profile management
8. Validation
9. Error handling

### Phase 3 — Admin

1. Authentication
2. Protected dashboard
3. CRUD UI
4. Draft/preview/publish
5. Ordering
6. Featured content
7. Media management

### Phase 4 — Public Portfolio

1. Homepage
2. Project listing
3. Dynamic project case studies
4. Experience
5. Skills
6. Certifications
7. Education
8. Hobbies
9. Contact

### Phase 5 — Premium Experience

1. GSAP
2. Framer Motion
3. Lenis
4. Scroll-driven storytelling
5. Micro-interactions
6. Reduced-motion support

### Phase 6 — Quality

1. SEO
2. Accessibility
3. Performance
4. Playwright
5. Security
6. Production build
7. Deployment

## Non-Negotiables

- No hardcoded CMS-managed content
- No MongoDB access from client components
- No exposed secrets
- No unauthenticated admin mutations
- No draft content publicly visible
- No animation that blocks navigation
- No unnecessary Client Components
- No fake SEO keyword stuffing
- No sacrificing performance for visual effects

## Quality Bar

The final portfolio should feel like a real product, not a CRUD demo.

It must be:

- Fast
- Accessible
- SEO-friendly
- Recruiter-friendly
- Mobile-first
- Visually premium
- Technically credible
- Easy to maintain
