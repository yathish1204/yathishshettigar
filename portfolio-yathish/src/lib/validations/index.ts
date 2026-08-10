import { z } from 'zod';

export const adminLoginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(150),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100)
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens (e.g. us-fex)'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(300),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  role: z.string().min(2, 'Role must be specified'),
  client: z.string().optional(),
  duration: z.string().optional(),
  year: z.union([z.string().min(1, 'Year or date is required'), z.number()]),
  thumbnail: z.string().url('Thumbnail must be a valid URL'),
  images: z.array(z.string().url()).optional(),
  technologies: z.array(z.string()).min(1, 'At least one technology must be specified'),
  responsibilities: z.array(z.string()).optional(),
  challenge: z.string().optional(),
  research: z.string().optional(),
  designProcess: z.string().optional(),
  solution: z.string().optional(),
  outcome: z.string().optional(),
  liveUrl: z.string().url().or(z.literal('')).optional(),
  githubUrl: z.string().url().or(z.literal('')).optional(),
  featured: z.boolean().default(false),
  isCorporateProject: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  order: z.number().int().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().url().or(z.literal('')).optional(),
});

export const projectUpdateSchema = projectSchema.partial();

export const experienceSchema = z.object({
  company: z.string().min(2, 'Company is required'),
  role: z.string().min(2, 'Role is required'),
  employmentType: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean().default(false),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  responsibilities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  order: z.number().int().default(0),
  status: z.enum(['published', 'draft']).default('published'),
});

export const experienceUpdateSchema = experienceSchema.partial();

export const skillSchema = z.object({
  name: z.string().min(2, 'Skill name is required'),
  category: z.enum([
    'UX & Product Development',
    'Front End Development',
    'Tools & Technology',
    'UX / Product Design',
    'Frontend',
    'Backend',
    'Database',
    'Tools',
    'Motion / Interaction',
  ]),
  proficiency: z.number().min(0).max(100).optional(),
  yearsOfExperience: z.number().min(0).optional(),
  icon: z.string().optional(),
  order: z.number().int().default(0),
  status: z.enum(['published', 'draft']).default('published'),
});

export const skillUpdateSchema = skillSchema.partial();

export const certificationSchema = z.object({
  name: z.string().min(2, 'Certification name is required'),
  issuer: z.string().min(2, 'Issuer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().optional().or(z.literal('')),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().or(z.literal('')).optional(),
  certificateImage: z.string().url().or(z.literal('')).optional(),
  thumbnail: z.string().url().or(z.literal('')).optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  status: z.enum(['published', 'draft']).default('published'),
});

export const certificationUpdateSchema = certificationSchema.partial();

export const educationSchema = z.object({
  institution: z.string().min(2, 'Institution is required'),
  degree: z.string().min(2, 'Degree is required'),
  field: z.string().min(2, 'Field of study is required'),
  startDate: z.string().min(4, 'Start date is required'),
  endDate: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().default(0),
});

export const educationUpdateSchema = educationSchema.partial();

export const hobbySchema = z.object({
  name: z.string().min(2, 'Hobby name is required'),
  description: z.string().min(5, 'Description is required'),
  icon: z.string().optional(),
  image: z.string().url().or(z.literal('')).optional(),
  order: z.number().int().default(0),
  status: z.enum(['published', 'draft']).default('published'),
});

export const hobbyUpdateSchema = hobbySchema.partial();

export const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  title: z.string().min(2, 'Title is required'),
  tagline: z.string().min(5, 'Tagline is required'),
  shortBio: z.string().min(10, 'Short bio is required'),
  longBio: z.string().min(20, 'Long bio is required'),
  profileImage: z.string().url().or(z.literal('')).optional(),
  heroVideoUrl: z.string().url().or(z.literal('')).optional(),
  heroVideoPoster: z.string().url().or(z.literal('')).optional(),
  heroVideoUrlLight: z.string().url().or(z.literal('')).optional(),
  heroVideoPosterLight: z.string().url().or(z.literal('')).optional(),
  resumeUrl: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  socialLinks: z
    .object({
      github: z.string().url().or(z.literal('')).optional(),
      linkedin: z.string().url().or(z.literal('')).optional(),
      twitter: z.string().url().or(z.literal('')).optional(),
      website: z.string().url().or(z.literal('')).optional(),
    })
    .optional(),
  availability: z.string().optional(),
});
