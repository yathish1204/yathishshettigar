import { connectToDatabase } from '@/lib/mongodb';
import { ExperienceModel } from '@/models/Experience';
import { Experience } from '@/types';

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    _id: '1',
    company: 'Enterprise Product Studio',
    role: 'Senior UX Engineer & Frontend Architect',
    employmentType: 'Full-time',
    location: 'Bengaluru, India (Hybrid)',
    startDate: '2023-01',
    current: true,
    summary:
      'Lead frontend architecture and UX design systems across multi-product SaaS suites, partnering closely with product and engineering executives.',
    responsibilities: [
      'Architected Next.js App Router design system deployed across 4 major web platforms.',
      'Established WCAG 2.1 AA accessibility guidelines and automated Playwright test pipelines.',
      'Mentored 8 mid/junior frontend developers in TypeScript best practices, performance, and accessibility.',
    ],
    achievements: [
      'Reduced design-to-production iteration time by 45% using automated token pipelines.',
      'Improved Core Web Vitals (LCP < 1.8s, CLS < 0.05) across all client touchpoints.',
    ],
    technologies: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Mongoose', 'Playwright'],
    order: 1,
    status: 'published',
  },
  {
    _id: '2',
    company: 'Tech Innovators Inc.',
    role: 'Frontend Engineer & Interaction Specialist',
    employmentType: 'Full-time',
    location: 'Bengaluru, India',
    startDate: '2021-03',
    endDate: '2022-12',
    current: false,
    summary:
      'Engineered high-throughput web portals, real-time analytics dashboards, and interactive user interfaces.',
    responsibilities: [
      'Built reusable component libraries with Storybook and React.',
      'Optimized client-side rendering bottlenecks and dynamic bundle splitting.',
    ],
    achievements: [
      'Engineered real-time analytics dashboard supporting 50k+ daily active users.',
      'Standardized REST & GraphQL data fetching strategies with strict Zod validation.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Zod'],
    order: 2,
    status: 'published',
  },
  {
    _id: '3',
    company: 'Digital Solutions Lab',
    role: 'UI/UX Designer & Web Developer',
    employmentType: 'Full-time',
    location: 'India',
    startDate: '2019-06',
    endDate: '2021-02',
    current: false,
    summary:
      'Designed user research workflows, interactive wireframes, and delivered production responsive frontends.',
    responsibilities: [
      'Conducted user interviews, card sorting, and usability testing sessions.',
      'Translated high-fidelity Figma mocks into semantic HTML/CSS/JavaScript implementations.',
    ],
    achievements: [
      'Designed and launched 12+ client websites with 100% on-time delivery.',
    ],
    technologies: ['Figma', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Sass', 'React'],
    order: 3,
    status: 'published',
  },
];

export async function getExperiences(): Promise<Experience[]> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_EXPERIENCES;

    const docs = await ExperienceModel.find({ status: 'published' })
      .sort({ order: 1, startDate: -1 })
      .lean();

    if (!docs || docs.length === 0) return DEFAULT_EXPERIENCES;

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      company: doc.company,
      role: doc.role,
      employmentType: doc.employmentType,
      location: doc.location,
      startDate: doc.startDate,
      endDate: doc.endDate,
      current: doc.current,
      summary: doc.summary,
      responsibilities: doc.responsibilities || [],
      achievements: doc.achievements || [],
      technologies: doc.technologies || [],
      order: doc.order,
      status: doc.status,
    }));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return DEFAULT_EXPERIENCES;
  }
}
