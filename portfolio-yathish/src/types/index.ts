export type SkillCategory =
  | 'UX & Product Development'
  | 'Front End Development'
  | 'Tools & Technology'
  | 'UX / Product Design'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Tools'
  | 'Motion / Interaction';

export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  instagram?: string;
  behance?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  profileImage?: string;
  heroVideoUrl?: string;
  heroVideoPoster?: string;
  heroVideoUrlLight?: string;
  heroVideoPosterLight?: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks?: SocialLinks;
  availability?: string;
  languages?: Language[];
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
  year: number | string;
  thumbnail?: string;
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
  isCorporateProject?: boolean;
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
  isLatestEmployer?: boolean;
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
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
  thumbnail?: string;
  featured?: boolean;
  order: number;
  status: 'published' | 'draft';
  categories?: ('AI' | 'UI' | 'Development' | 'Others')[];
  category?: 'AI' | 'UI' | 'Development' | 'Others';
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Hobby {
  _id?: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  order: number;
  status: 'published' | 'draft';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck?: boolean | string;
  recaptchaToken?: string;
}

export interface ContactMessage extends ContactInput {
  _id?: string;
  read?: boolean;
  createdAt?: string | Date;
}

export * from './dataTypes';

