# Portfolio Functional Requirements

## Purpose

This file defines the functional behavior of the portfolio CMS and public website.

The visual design is intentionally not specified here.

## 1. Content Management

Admin must be able to manage:

- Profile
- Projects
- Experience
- Skills
- Certifications
- Education
- Hobbies

All content intended to be CMS-managed must come from MongoDB.

No hardcoded production portfolio content.

## 2. Project Workflow

Admin can:

1. Create project
2. Save draft
3. Edit draft
4. Preview draft
5. Publish
6. Edit published project
7. Archive project
8. Delete project
9. Mark featured
10. Reorder project
11. Add/remove project images
12. Add external links

Public users can only see published projects.

## 3. Project Slug

Every published project requires a unique slug.

Example:

`us-fex`

URL:

`/projects/us-fex`

Changing a slug should be handled carefully to avoid broken links.

If slug history is implemented later, support redirects.

## 4. Homepage Content

Homepage should query:

- Profile
- Featured published projects
- Current/recent experience
- Skill groups
- Selected certifications
- Hobbies/interests

Do not fetch every record if only a subset is needed.

## 5. Project Detail

When a user visits:

`/projects/[slug]`

System must:

1. Validate slug
2. Fetch project
3. Ensure project is published
4. Generate metadata
5. Render project content
6. Render related/next projects if configured

If not found:

Return a proper 404 page.

## 6. Experience

Admin can:

- Add experience
- Edit experience
- Delete experience
- Mark current role
- Set dates
- Add achievements
- Add technologies
- Reorder entries

Public site displays experience in configured order.

## 7. Skills

Admin can:

- Add skill
- Edit skill
- Delete skill
- Assign category
- Set order
- Set optional years of experience

Do not force fake percentage-based skill levels.

## 8. Certifications

Admin can:

- Add certification
- Edit
- Delete
- Add credential URL
- Add credential ID
- Add certificate image
- Set date
- Reorder

## 9. Education

Admin can:

- Add
- Edit
- Delete
- Reorder

## 10. Hobbies

Admin can:

- Add
- Edit
- Delete
- Add description
- Add image
- Reorder

Hobbies should support the personal side of the portfolio without overwhelming professional content.

## 11. Profile

Admin can update:

- Name
- Professional title
- Tagline
- About content
- Profile image
- Resume
- Contact details
- Social links
- Availability

Profile information must be centralized.

## 12. Resume

Resume should have:

- Download URL
- Optional version/date metadata

The public CTA should open/download the current published resume.

## 13. Contact

If contact form is implemented:

Fields:

- Name
- Email
- Subject
- Message

Behavior:

- Validate
- Prevent spam/abuse
- Show loading
- Show success
- Show failure
- Do not expose private server credentials

## 14. Search / Filtering

Optional future feature.

Projects can support:

- Technology filter
- Category filter
- Featured filter

Do not add search unless project volume makes it useful.

## 15. Ordering

Admin ordering must be deterministic.

Default sorting:

`order ASC`

Secondary sorting:

`createdAt DESC`

## 16. Publish Rules

A project cannot become publicly visible unless:

- Required fields exist
- Slug is valid
- Slug is unique
- Status is published

Optional: enforce a minimum case-study completeness check before publish.

## 17. Preview

Preview should allow admin to see unpublished content without exposing it publicly.

Preview must require authenticated access or a secure preview mechanism.

Never make `/projects/draft-project` publicly accessible simply because the URL is unknown.

## 18. Caching

After publishing/updating public content:

- Revalidate homepage
- Revalidate affected listing page
- Revalidate affected project page
- Revalidate sitemap/metadata if applicable

## 19. Accessibility Behavior

All interactive features must work without:

- Mouse
- Hover
- Animation

Keyboard-only navigation must remain possible.

## 20. Reduced Motion

If the user prefers reduced motion:

- Disable or simplify GSAP scrub effects
- Disable unnecessary page transitions
- Disable decorative parallax
- Preserve content order
- Preserve all functionality

## 21. Failure Behavior

If MongoDB is unavailable:

- Public page should fail gracefully
- Admin should display a useful error
- Never expose raw database errors
- Log server-side diagnostics

## 22. Security Behavior

Unauthorized users:

- Cannot access admin dashboard
- Cannot mutate CMS content
- Cannot preview private drafts

Public users:

- Can only access intended published content
- Cannot query arbitrary private records through IDs

## 23. Performance Behavior

Avoid:

- N+1 queries
- Large client-side data fetching
- Unnecessary hydration
- Loading every project image on initial page load
- Giant JavaScript bundles

Prefer:

- Server-side data fetching
- Caching
- Image optimization
- Pagination where appropriate
- Lazy loading
- Selective hydration

## 24. HR / Manager Conversion

The functional experience should support a recruiter journey:

Landing
→ Understand role
→ See strongest work
→ Verify experience
→ Scan skills
→ Download resume
→ Contact

Primary professional actions must always remain easy to reach.

## 25. Definition of Done

A feature is complete only when:

- Happy path works
- Validation works
- Unauthorized behavior works
- Error behavior works
- Mobile behavior works
- Keyboard behavior works
- Reduced motion behavior works
- Playwright test exists for important user journeys
