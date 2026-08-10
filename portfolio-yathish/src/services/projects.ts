import { cache } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { ProjectModel } from '@/models/Project';
import { Project } from '@/types';

export const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'US-FEX — Enterprise UX Engineering System',
    slug: 'us-fex',
    shortDescription:
      'A unified, highly accessible component design system and full-stack Next.js web application engineered for enterprise scalability.',
    description:
      'US-FEX is a comprehensive UX engineering ecosystem built to solve fragmentation across large enterprise product teams. Combining automated WCAG accessibility verification, dynamic design token distribution, and high-performance server components.',
    role: 'Lead UX Engineer & Frontend Architect',
    client: 'Enterprise Design Systems Group',
    duration: '6 Months',
    year: 2025,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    ],
    technologies: ['Next.js 15', 'TypeScript', 'React 19', 'Tailwind CSS', 'GSAP', 'Mongoose', 'Zod', 'Playwright'],
    responsibilities: [
      'Architected full-stack Next.js App Router component hierarchy and Server Actions layer.',
      'Designed accessible design token system conforming to WCAG 2.1 AA standards.',
      'Built automated end-to-end testing suite with Playwright for core user workflows.',
    ],
    challenge:
      'Inconsistent UI components across 5 product platforms created severe brand fragmentation and high engineering maintenance costs.',
    research:
      'Conducted 18 stakeholder interviews with product managers and engineers to identify component bottlenecks and accessibility gaps.',
    designProcess:
      'Created modular Figma design primitives tied directly to Tailwind CSS variables, ensuring 1:1 parity between design and production code.',
    solution:
      'Engineered zero-runtime-cost CSS variable design tokens and headless accessible primitives with automated testing.',
    outcome:
      'Accelerated feature deployment speed by 45% while reducing frontend accessibility defects to zero across 4 product releases.',
    liveUrl: 'https://us-fex.example.com',
    githubUrl: 'https://github.com/example/us-fex',
    featured: true,
    status: 'published',
    order: 1,
    seoTitle: 'US-FEX — Enterprise UX Engineering Case Study | Yathish Shettigar',
    seoDescription:
      'In-depth UX Engineering case study of US-FEX: enterprise Next.js design system, server component architecture, and WCAG accessibility.',
    ogImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Nova Analytics — Financial Analytics Dashboard',
    slug: 'nova-analytics',
    shortDescription:
      'A real-time financial monitoring web application built with Next.js, Recharts, and accessible dark mode UI primitives.',
    description:
      'Nova Analytics provides institutional traders with low-latency financial visualizations, custom chart layouts, and stream updates.',
    role: 'Senior UX Engineer',
    client: 'FinTech Global Solutions',
    duration: '4 Months',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    ],
    technologies: ['React 19', 'Next.js', 'Tailwind CSS', 'Recharts', 'TypeScript'],
    responsibilities: [
      'Built high-frequency data chart components with sub-100ms render performance.',
      'Implemented fluid responsive dark mode theme primitives.',
    ],
    challenge:
      'Complex tabular data and dense financial charts overburdened user cognition on mobile displays.',
    research:
      'Analyzed user session recordings to optimize UI layout hierarchy and chart zoom controls.',
    designProcess:
      'Iterated card layouts with high-contrast color coding for real-time market trends.',
    solution:
      'Streamlined dashboard layout with collapsible side panels and touch-optimized chart controls.',
    outcome:
      'Increased mobile dashboard active session length by 38%.',
    liveUrl: 'https://nova-analytics.example.com',
    githubUrl: 'https://github.com/example/nova-analytics',
    featured: false,
    status: 'published',
    order: 2,
  },
  {
    title: 'Pulse Health — Telehealth Care Platform',
    slug: 'pulse-health',
    shortDescription:
      'A HIPAA-compliant mobile telehealth patient portal offering asynchronous doctor consultations and prescription management.',
    description:
      'Pulse Health streamlines virtual consultations for chronic care patients, featuring automated appointment reminders and secure chat.',
    role: 'Lead Frontend Developer',
    client: 'Pulse Healthcare Systems',
    duration: '5 Months',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebRTC', 'Node.js'],
    responsibilities: [
      'Developed real-time video consultation interface with fallback connection handling.',
      'Ensured strict compliance with HIPAA security standards.',
    ],
    challenge:
      'Elderly patients struggled with convoluted registration forms and camera permission prompts.',
    research:
      'Conducted remote usability testing with 12 senior patients to refine onboarding flow.',
    designProcess:
      'Designed high-legibility typographic scale and single-tap appointment join buttons.',
    solution:
      'Engineered 3-step simplified appointment join workflow with visual diagnostic feedback.',
    outcome:
      'Reduced missed virtual appointments by 52%.',
    liveUrl: 'https://pulse-health.example.com',
    githubUrl: 'https://github.com/example/pulse-health',
    featured: true,
    status: 'published',
    order: 3,
  },
  {
    title: 'OmniToken — Multi-Brand Design Token Engine',
    slug: 'omni-token',
    shortDescription:
      'Automated design token transformation pipeline converting Figma styles into multi-platform CSS, Swift, and Android XML assets.',
    description:
      'OmniToken syncs design variables directly from Figma APIs and distributes audited design tokens across web, iOS, and Android codebases.',
    role: 'Design System Architect',
    client: 'Omni Digital Ecosystems',
    duration: '3 Months',
    year: 2023,
    thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1000',
    ],
    technologies: ['TypeScript', 'Style Dictionary', 'Node.js', 'Figma API', 'Tailwind CSS'],
    responsibilities: [
      'Authored automated Style Dictionary build transforms for web and mobile targets.',
      'Integrated GitHub Actions CI pipeline for automated token publishing.',
    ],
    challenge:
      'Manual copy-pasting of color hex codes and spacing tokens caused constant visual regressions.',
    research:
      'Audited 400+ color and typography tokens across 3 separate brand style guides.',
    designProcess:
      'Mapped semantic token names (`color.surface.primary`) to core primitive tokens.',
    solution:
      'Built CLI tool that builds and validates tokens on every Figma publish event.',
    outcome:
      'Eliminated token handoff friction completely across 6 engineering teams.',
    liveUrl: 'https://omni-token.example.com',
    githubUrl: 'https://github.com/example/omni-token',
    featured: false,
    status: 'published',
    order: 4,
  },
];

let cachedProjects: Project[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 30000;

function sanitizeProjectDoc(doc: any): Project {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    description: doc.description,
    role: doc.role,
    client: doc.client,
    duration: doc.duration,
    year: doc.year,
    thumbnail: doc.thumbnail,
    images: doc.images || [],
    technologies: doc.technologies || [],
    responsibilities: doc.responsibilities || [],
    challenge: doc.challenge,
    research: doc.research,
    designProcess: doc.designProcess,
    solution: doc.solution,
    outcome: doc.outcome,
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
    featured: doc.featured || false,
    isCorporateProject: doc.isCorporateProject || false,
    status: doc.status,
    order: doc.order,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    ogImage: doc.ogImage,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

async function ensureSeedProjects() {
  const count = await ProjectModel.countDocuments();
  if (count === 0) {
    await ProjectModel.insertMany(DEFAULT_PROJECTS);
  }
}

export const getPublishedProjects = cache(async function getPublishedProjects(): Promise<Project[]> {
  const now = Date.now();
  if (cachedProjects && now - lastFetchTime < CACHE_TTL) {
    return cachedProjects;
  }

  try {
    const db = await connectToDatabase();
    if (!db) return cachedProjects || DEFAULT_PROJECTS;

    const docs = await ProjectModel.find({ status: 'published' })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    if (docs.length === 0) {
      await ensureSeedProjects();
      const reDocs = await ProjectModel.find({ status: 'published' }).sort({ order: 1, createdAt: -1 }).lean();
      const result = reDocs.map(sanitizeProjectDoc);
      cachedProjects = result;
      lastFetchTime = now;
      return result;
    }

    const result = docs.map(sanitizeProjectDoc);
    cachedProjects = result;
    lastFetchTime = now;
    return result;
  } catch (error) {
    console.error('Error fetching published projects:', error);
    return cachedProjects || DEFAULT_PROJECTS;
  }
});

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getPublishedProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getPublishedProjects();
  const found = projects.find((p) => p.slug === slug);
  if (found) return found;

  try {
    const db = await connectToDatabase();
    if (!db) return null;
    const doc = await ProjectModel.findOne({ slug, status: 'published' }).lean();
    if (!doc) return null;
    return sanitizeProjectDoc(doc);
  } catch (error) {
    return null;
  }
}

export async function getAllProjectsForAdmin(status?: string): Promise<Project[]> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_PROJECTS;

  await ensureSeedProjects();

  const query = status ? { status } : {};
  const docs = await ProjectModel.find(query).sort({ order: 1, createdAt: -1 }).lean();
  return docs.map(sanitizeProjectDoc);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = await connectToDatabase();
  if (!db) {
    const found = DEFAULT_PROJECTS.find((p) => p._id === id || p.slug === id);
    return found || null;
  }

  await ensureSeedProjects();

  const doc = await ProjectModel.findById(id).lean();
  if (!doc) return null;

  return sanitizeProjectDoc(doc);
}

export async function createProject(data: Omit<Project, '_id'>): Promise<{ success: boolean; project?: Project; error?: string }> {
  const db = await connectToDatabase();
  if (!db) {
    const newProject: Project = { ...data, _id: `proj_${Date.now()}` };
    DEFAULT_PROJECTS.unshift(newProject);
    cachedProjects = null;
    lastFetchTime = 0;
    return { success: true, project: newProject };
  }

  await ensureSeedProjects();

  const existingSlug = await ProjectModel.findOne({ slug: data.slug }).lean();
  if (existingSlug) {
    return { success: false, error: `A project with slug "${data.slug}" already exists.` };
  }

  const createdDoc = await ProjectModel.create(data);
  cachedProjects = null;
  lastFetchTime = 0;

  return { success: true, project: sanitizeProjectDoc(createdDoc.toObject()) };
}

export async function updateProject(id: string, data: Partial<Project>): Promise<{ success: boolean; project?: Project; error?: string }> {
  const db = await connectToDatabase();
  if (!db) {
    const idx = DEFAULT_PROJECTS.findIndex((p) => p._id === id || p.slug === id);
    if (idx !== -1) {
      DEFAULT_PROJECTS[idx] = { ...DEFAULT_PROJECTS[idx], ...data };
      cachedProjects = null;
      lastFetchTime = 0;
      return { success: true, project: DEFAULT_PROJECTS[idx] };
    }
    return { success: false, error: 'Project not found in memory' };
  }

  await ensureSeedProjects();

  if (data.slug) {
    const existingSlug = await ProjectModel.findOne({ slug: data.slug, _id: { $ne: id } }).lean();
    if (existingSlug) {
      return { success: false, error: `A project with slug "${data.slug}" already exists.` };
    }
  }

  const updatedDoc = await ProjectModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) return { success: false, error: 'Project not found' };

  cachedProjects = null;
  lastFetchTime = 0;

  return { success: true, project: sanitizeProjectDoc(updatedDoc) };
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) return { success: false, error: 'Database connection unavailable' };

  await ensureSeedProjects();

  const deleted = await ProjectModel.findByIdAndDelete(id).lean();
  if (!deleted) return { success: false, error: 'Project not found' };

  cachedProjects = null;
  lastFetchTime = 0;

  return { success: true };
}
