export type ProjectStatus = 'draft' | 'published' | 'archived';
export type SkillCategory = 'UX / Product Design' | 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Motion / Interaction';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  profileImage?: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks?: SocialLinks;
  availability?: string;
  updatedAt?: string | Date;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  role: string;
  client?: string;
  duration?: string;
  year: number;
  thumbnail: string;
  images?: string[];
  technologies: string[];
  responsibilities?: string[];
  challenge?: string;
  research?: string;
  designProcess?: string;
  solution?: string;
  outcome?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Experience {
  _id?: string;
  company: string;
  role: string;
  employmentType?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  summary: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
  order: number;
  status: 'published' | 'draft';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Skill {
  _id?: string;
  name: string;
  category: SkillCategory;
  proficiency?: number;
  yearsOfExperience?: number;
  icon?: string;
  order: number;
  status: 'published' | 'draft';
}

export interface Certification {
  _id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  order: number;
  status: 'published' | 'draft';
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  order: number;
}

export interface Hobby {
  _id?: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  order: number;
  status: 'published' | 'draft';
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactInput {
  _id?: string;
  read?: boolean;
  createdAt?: string | Date;
}
