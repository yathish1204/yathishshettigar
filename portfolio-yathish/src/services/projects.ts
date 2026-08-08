import { connectToDatabase } from '@/lib/mongodb';
import { ProjectModel } from '@/models/Project';
import { Project } from '@/types';

export const DEFAULT_PROJECTS: Project[] = [
  {
    _id: '1',
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
    _id: '2',
    title: 'PulseAnalytics — Real-Time UX Metrics Dashboard',
    slug: 'pulse-analytics',
    shortDescription:
      'High-performance real-time user behavior analytics platform featuring dynamic chart visualizer and responsive data tables.',
    description:
      'PulseAnalytics provides real-time visualization of digital product performance metrics, clickstreams, and user conversion funnels.',
    role: 'Frontend Engineer & Interaction Specialist',
    client: 'FinTech Analytics Corp',
    duration: '4 Months',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MongoDB', 'Recharts'],
    responsibilities: [
      'Built responsive dashboard layout with customizable widget grids.',
      'Optimized heavy DOM data rendering with virtualized tables and incremental chart updates.',
    ],
    challenge:
      'Large data payloads caused main thread freezing during real-time chart updates on mobile devices.',
    research: 'Analyzed performance profiles identifying canvas redraw and layout thrashing issues.',
    solution:
      'Implemented Web Worker data parsing and dynamic lazy loading of historical metric segments.',
    outcome:
      'Achieved silky-smooth 60fps chart rendering and cut initial dashboard load time by 60%.',
    liveUrl: 'https://pulseanalytics.example.com',
    githubUrl: 'https://github.com/example/pulse-analytics',
    featured: true,
    status: 'published',
    order: 2,
    seoTitle: 'PulseAnalytics — UX Metrics Platform Case Study | Yathish Shettigar',
    seoDescription:
      'Case study on building PulseAnalytics: real-time dashboard visualization and mobile-first performance optimization.',
  },
  {
    _id: '3',
    title: 'AuraStudio — Creative Portfolio & Micro-Interaction Engine',
    slug: 'aura-studio',
    shortDescription:
      'An immersive, scroll-driven interactive portfolio website showcasing custom GSAP animations and Lenis smooth scrolling.',
    description:
      'AuraStudio is a digital brand experience crafted to push the boundaries of modern browser interactions without sacrificing performance.',
    role: 'UX Designer & Motion Developer',
    client: 'Aura Digital Agency',
    duration: '3 Months',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    ],
    technologies: ['Next.js', 'TypeScript', 'GSAP', 'ScrollTrigger', 'Lenis', 'Tailwind CSS'],
    responsibilities: [
      'Designed interactive wireframes and motion choreography.',
      'Developed GSAP timeline sequences and Lenis smooth scroll integration.',
    ],
    challenge:
      'Balancing high-end visual animations with strict accessibility and reduced-motion user preferences.',
    solution:
      'Built custom motion hooks that automatically disable scroll scrubbing when `prefers-reduced-motion` is detected.',
    outcome:
      'Delivered an award-nominated visual experience with a 100/100 Lighthouse performance score.',
    liveUrl: 'https://aurastudio.example.com',
    githubUrl: 'https://github.com/example/aura-studio',
    featured: true,
    status: 'published',
    order: 3,
    seoTitle: 'AuraStudio — Creative Portfolio Case Study | Yathish Shettigar',
    seoDescription:
      'Explore the design and implementation of AuraStudio: interactive GSAP animations, Lenis scroll, and accessible motion controls.',
  },
];

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
    technologies: doc.technologies,
    responsibilities: doc.responsibilities || [],
    challenge: doc.challenge,
    research: doc.research,
    designProcess: doc.designProcess,
    solution: doc.solution,
    outcome: doc.outcome,
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
    featured: doc.featured,
    status: doc.status,
    order: doc.order,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    ogImage: doc.ogImage,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_PROJECTS;

    const docs = await ProjectModel.find({ status: 'published' })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    if (!docs || docs.length === 0) return DEFAULT_PROJECTS;
    return docs.map(sanitizeProjectDoc);
  } catch (error) {
    console.error('Error fetching published projects:', error);
    return DEFAULT_PROJECTS;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getPublishedProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
    }

    const doc = await ProjectModel.findOne({ slug, status: 'published' }).lean();
    if (!doc) {
      return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
    }

    return sanitizeProjectDoc(doc);
  } catch (error) {
    console.error(`Error fetching project slug "${slug}":`, error);
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function getAllProjectsForAdmin(status?: string): Promise<Project[]> {
  const db = await connectToDatabase();
  if (!db) return DEFAULT_PROJECTS;

  const query = status ? { status } : {};
  const docs = await ProjectModel.find(query).sort({ order: 1, createdAt: -1 }).lean();
  return docs.map(sanitizeProjectDoc);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = await connectToDatabase();
  if (!db) {
    return DEFAULT_PROJECTS.find((p) => p._id === id) || null;
  }

  const doc = await ProjectModel.findById(id).lean();
  if (!doc) return null;

  return sanitizeProjectDoc(doc);
}

export async function createProject(data: Omit<Project, '_id'>): Promise<{ success: boolean; project?: Project; error?: string }> {
  const db = await connectToDatabase();
  if (!db) {
    return { success: false, error: 'Database connection unavailable' };
  }

  const existingSlug = await ProjectModel.findOne({ slug: data.slug }).lean();
  if (existingSlug) {
    return { success: false, error: `A project with slug "${data.slug}" already exists.` };
  }

  const createdDoc = await ProjectModel.create(data);
  return { success: true, project: sanitizeProjectDoc(createdDoc.toObject()) };
}

export async function updateProject(id: string, data: Partial<Project>): Promise<{ success: boolean; project?: Project; error?: string }> {
  const db = await connectToDatabase();
  if (!db) {
    return { success: false, error: 'Database connection unavailable' };
  }

  if (data.slug) {
    const existingSlug = await ProjectModel.findOne({ slug: data.slug, _id: { $ne: id } }).lean();
    if (existingSlug) {
      return { success: false, error: `A project with slug "${data.slug}" already exists.` };
    }
  }

  const updatedDoc = await ProjectModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
  if (!updatedDoc) {
    return { success: false, error: 'Project not found' };
  }

  return { success: true, project: sanitizeProjectDoc(updatedDoc) };
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  const db = await connectToDatabase();
  if (!db) {
    return { success: false, error: 'Database connection unavailable' };
  }

  const deleted = await ProjectModel.findByIdAndDelete(id).lean();
  if (!deleted) {
    return { success: false, error: 'Project not found' };
  }

  return { success: true };
}
