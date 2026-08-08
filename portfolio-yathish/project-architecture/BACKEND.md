# Portfolio CMS — Backend Specification

## 0. Project Goal

Build a production-ready, backend-driven personal portfolio CMS for Yathish Shettigar.

Primary objective:

- Manage portfolio content without changing source code.
- Keep public portfolio pages SEO-friendly and fast.
- Keep admin functionality secure and separate from public content.
- Support Projects, Experience, Skills, Certifications, Education, Hobbies, Profile, and Media.
- Use Next.js full-stack architecture; do NOT create a separate Express server unless explicitly required.

## 1. Required Stack

- Next.js with App Router
- TypeScript
- React
- MongoDB
- Mongoose
- Zod
- Next.js Route Handlers and/or Server Actions
- Authentication for admin access
- Playwright for end-to-end testing
- ESLint + TypeScript strict mode

## 2. Architecture

Use this logical flow:

Public/Admin UI
    ↓
Server Action / Route Handler
    ↓
Zod validation
    ↓
Service layer
    ↓
Mongoose model
    ↓
MongoDB

Rules:

- Never access MongoDB directly from client components.
- Never expose secrets to the browser.
- Keep database logic server-only.
- Keep validation independent from UI.
- Keep business logic in service modules rather than giant route files.
- Prefer Server Components for read-heavy public portfolio content.
- Use Client Components only when interactivity is actually required.

## 3. Folder Structure

src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── experience/
│   │   ├── certifications/
│   │   └── contact/
│   ├── admin/
│   │   ├── login/
│   │   └── dashboard/
│   └── api/
│       ├── projects/
│       ├── experience/
│       ├── skills/
│       ├── certifications/
│       ├── education/
│       ├── hobbies/
│       └── profile/
├── components/
├── lib/
│   ├── mongodb.ts
│   ├── auth.ts
│   └── validations/
├── models/
├── services/
├── types/
└── utils/

## 4. Environment Variables

Use `.env.local`.

Required:

MONGODB_URI=
AUTH_SECRET=

Optional media provider variables can be added later.

Never commit `.env.local`.

## 5. Database Models

### Profile

Fields:

- name
- title
- tagline
- shortBio
- longBio
- profileImage
- resumeUrl
- email
- phone if intentionally public
- location
- socialLinks
- availability
- updatedAt

### Project

Fields:

- title
- slug
- shortDescription
- description
- role
- client
- duration
- year
- thumbnail
- images
- technologies
- responsibilities
- challenge
- research
- designProcess
- solution
- outcome
- liveUrl
- githubUrl
- featured
- status: draft | published | archived
- order
- seoTitle
- seoDescription
- ogImage
- createdAt
- updatedAt

### Experience

Fields:

- company
- role
- employmentType
- location
- startDate
- endDate
- current
- summary
- responsibilities
- achievements
- technologies
- order
- status

### Skill

Fields:

- name
- category
- proficiency
- yearsOfExperience
- icon
- order
- status

### Certification

Fields:

- name
- issuer
- issueDate
- expiryDate
- credentialId
- credentialUrl
- certificateImage
- order
- status

### Education

Fields:

- institution
- degree
- field
- startDate
- endDate
- description
- order

### Hobby

Fields:

- name
- description
- icon
- image
- order
- status

## 6. API Requirements

Projects:

GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id

Public project retrieval:

GET /api/projects/slug/:slug

Equivalent CRUD endpoints can be created for:

- experience
- skills
- certifications
- education
- hobbies
- profile

Public endpoints must return only published/active content.

Admin endpoints must require authentication and authorization.

## 7. Validation

Every mutation must validate input with Zod.

Validation must happen server-side even if the frontend already validates.

Examples:

- Required project title
- Valid slug
- Unique slug
- Valid status enum
- Valid URL format
- Valid year/date
- Array validation for technologies
- Reasonable text length limits

Never trust client input.

## 8. Service Layer

Create service functions such as:

- createProject()
- getProjects()
- getPublishedProjects()
- getFeaturedProjects()
- getProjectById()
- getProjectBySlug()
- updateProject()
- deleteProject()

Repeat the pattern for other content types.

Route handlers should remain thin:

Request
→ validation
→ service
→ response

## 9. Public Content Rules

Public portfolio must only expose:

status = published

For projects:

- published
- optionally featured
- ordered by `order`

Draft and archived content must never appear publicly.

## 10. Draft / Preview / Publish

Implement content lifecycle:

draft → preview → published → archived

Admin must be able to:

- Save draft
- Preview
- Publish
- Unpublish/archive

Publishing should trigger appropriate Next.js cache revalidation.

## 11. Ordering

Every repeatable portfolio section should support manual ordering.

Examples:

- Featured projects
- Experience
- Skills
- Certifications
- Education
- Hobbies

Use numeric `order`.

## 12. Authentication and Authorization

Admin dashboard requires authentication.

Requirements:

- Secure session
- Password hashing where password auth is used
- Protected admin routes
- Protected POST/PATCH/DELETE operations
- Public GET access only for intended published content
- Do not expose authentication secrets
- Do not rely only on frontend route protection

## 13. Database Performance

Create indexes for frequently queried fields.

At minimum consider:

- Project.slug unique index
- Project.status
- Project.featured
- Project.order
- Similar status/order indexes for other collections

Avoid unnecessary database queries.

Use lean/read-optimized queries where appropriate.

## 14. Error Handling

Use consistent API responses.

Success:

{
  "success": true,
  "data": {}
}

Failure:

{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message"
  }
}

Do not expose database stack traces or secrets.

## 15. Security

Implement:

- Server-side validation
- Authentication
- Authorization
- Rate limiting where appropriate
- Safe file upload validation
- XSS-safe content rendering
- Secure cookies/session configuration
- Environment variable protection
- Safe URL validation
- No sensitive information in API responses

If rich text/HTML is supported, sanitize it before rendering.

## 16. Media

Do not store large image binaries directly in MongoDB.

Store media in an appropriate object/image storage provider.

MongoDB should store metadata/URLs.

Support:

- Project thumbnail
- Project gallery
- Profile image
- Certificate image
- Hobby image
- OG image

Include alt text for public images.

## 17. SEO Data Model

Projects should support:

- seoTitle
- seoDescription
- ogImage
- canonical URL if needed

Public pages should generate metadata from database content.

Do not generate SEO metadata from client-only code.

## 18. Caching and Revalidation

Optimize public read performance.

Preferred strategy:

- Server Components for public content
- Appropriate Next.js caching/revalidation
- Revalidate affected routes after publish/update
- Avoid unnecessary client-side fetching for static portfolio sections

## 19. Testing Requirements

Use Playwright for end-to-end tests.

Critical flows:

### Public

- Homepage loads
- Projects list loads
- Project detail loads
- Draft project is not publicly visible
- Navigation works
- Contact CTA works
- Mobile layout works

### Admin

- Login works
- Unauthorized users cannot access dashboard
- Create project
- Edit project
- Delete project
- Save draft
- Publish project
- Preview project

### API

Test:

- Valid POST
- Invalid POST
- Duplicate slug
- Unauthorized mutation
- Missing project
- Successful update
- Successful delete

## 20. Definition of Done

Backend is considered complete only when:

- MongoDB connection is stable
- Models are implemented
- CRUD works
- Zod validation works
- Service layer exists
- Authentication works
- Admin APIs are protected
- Draft/published workflow works
- Ordering works
- Public queries exclude unpublished content
- SEO fields are supported
- Error handling is consistent
- Playwright covers critical flows
- No secrets are exposed
- Production build succeeds

## 21. Antigravity Execution Rules

When implementing this specification:

1. Inspect the existing repository before changing files.
2. Do not rewrite unrelated working code.
3. Work incrementally.
4. After each milestone, run type checking/linting/tests.
5. Fix errors before continuing.
6. Prefer small, maintainable modules.
7. Do not introduce dependencies without a clear reason.
8. Keep UI implementation separate from backend logic.
9. Do not use mock data after the real database layer is available.
10. Never hardcode portfolio content that is intended to be CMS-managed.
