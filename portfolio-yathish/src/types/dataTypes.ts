import { ReactNode } from 'react';
import { Profile, SkillCategory } from './index';

/**
 * Interface representing a social link icon and target URL in the Hero section.
 */
export interface SocialItem {
  /** Display name of the social platform (e.g. 'GitHub', 'LinkedIn') */
  name: string;
  /** Direct URL or fallback link */
  href: string;
  /** React SVG icon element or component */
  icon: ReactNode;
}

/**
 * Interface for mapping skill categories to legacy Sanity/CMS database names.
 */
export interface SkillCategoryMapping {
  /** Primary category key */
  key: SkillCategory;
  /** Display title for the skill column */
  title: SkillCategory;
  /** Array of legacy or variant category names matching this column */
  legacyMatches: string[];
}

/**
 * Interface representing a step in the UX Engineering Methodology grid.
 */
export interface MethodStep {
  /** Step number identifier (e.g. '01', '02') */
  step: string;
  /** Title of the methodology phase */
  title: string;
  /** Concise description of the phase work */
  description: string;
  /** Key deliverable tags */
  tags: string[];
}

/**
 * Interface for static About section metadata & fallback bio.
 */
export interface AboutData {
  /** Eyebrow text above title */
  eyebrow: string;
  /** Main section headline */
  title: string;
  /** Summary biography paragraph */
  bioText: string;
}
