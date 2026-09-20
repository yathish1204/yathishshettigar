import React from 'react';
import { Profile, SocialItem, SkillCategoryMapping, MethodStep, AboutData } from '@/types';

/**
 * ============================================================================
 * PORTFOLIO STATIC DATA & CONFIGURATION
 * ============================================================================
 * This file centralizes static content, fallback configurations, and metadata
 * used across the Hero, About, and Skills sections of the portfolio.
 */

// ----------------------------------------------------------------------------
// 1. HERO SECTION DATA & SOCIAL LINKS
// ----------------------------------------------------------------------------

/**
 * Generates the list of social media links with fallback URLs and SVG icons
 * for the Hero section.
 *
 * @param profile - The user profile containing optional custom social links
 * @returns Array of typed SocialItem objects with SVG icon nodes
 */
export function getHeroSocialItems(profile: Profile): SocialItem[] {
  return [
    {
      name: 'GitHub',
      href: profile.socialLinks?.github || 'https://github.com/yathish1204',
      icon: React.createElement(
        'svg',
        { className: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
        })
      ),
    },
    {
      name: 'LinkedIn',
      href: profile.socialLinks?.linkedin || 'https://linkedin.com/in/yathish-shettigar',
      icon: React.createElement(
        'svg',
        { className: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
        })
      ),
    },
    {
      name: 'Instagram',
      href: profile.socialLinks?.instagram || 'https://www.instagram.com/y_shettigar_',
      icon: React.createElement(
        'svg',
        { className: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
        })
      ),
    },
    {
      name: 'Behance',
      href: profile.socialLinks?.behance || 'https://www.behance.net/yathishshettigar',
      icon: React.createElement(
        'svg',
        { className: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.813 3-3.111 0-5.385-2.221-5.385-5.518 0-3.477 2.371-5.482 5.253-5.482 3.167 0 4.88 2.155 4.88 5.241 0 .422-.053.844-.078 1.055h-7.391c.148 1.547 1.306 2.38 2.734 2.38 1.258 0 2.062-.57 2.384-1.348h2.416zm-4.966-5.414c-1.163 0-2.03.684-2.261 1.942h4.481c-.085-1.196-.89-1.942-2.22-1.942zm-10.76-6.586h-8.000v14h7.458c2.909 0 5.042-1.621 5.042-4.148 0-1.785-1.026-3.08-2.457-3.565 1.066-.486 1.776-1.549 1.776-3.036 0-2.115-1.662-3.251-3.819-3.251zm-4.789 2.456h2.247c1.173 0 1.907.502 1.907 1.394 0 .977-.82 1.488-2.029 1.488h-2.125v-2.882zm0 5.214h2.518c1.328 0 2.148.553 2.148 1.572 0 1.139-.938 1.697-2.277 1.697h-2.389v-4.269z',
        })
      ),
    },
  ];
}


// ----------------------------------------------------------------------------
// 2. ABOUT SECTION DATA & METHODOLOGY STEPS
// ----------------------------------------------------------------------------

/**
 * Static headers & biography content for the About section.
 */
export const ABOUT_SECTION_DATA: AboutData = {
  eyebrow: 'About Me',
  title: 'UX Design + Frontend Architecture',
  bioText: `I’m a UX Engineer with 2 years of experience working at the intersection of design and frontend development. I turn user needs and design concepts into accessible, responsive, and high-performing web experiences using React, Next.js, and modern frontend technologies. For me, good engineering isn’t just about making things work — it’s about making them feel right, too.`,
};

/**
 * The 4 core steps of the UX Engineering Methodology grid.
 */
export const METHODOLOGY_STEPS: MethodStep[] = [
  {
    step: '01',
    title: 'Discover',
    description:
      'Stakeholder interviews, usability testing, journey mapping and competitive teardowns to find the real problem before a pixel exists.',
    tags: ['User interviews', 'Journey maps', 'Heuristic audit'],
  },
  {
    step: '02',
    title: 'Define',
    description:
      'Information architecture, task flows and jobs-to-be-done framing that turn messy research into a defensible product direction.',
    tags: ['IA & flows', 'JTBD framing', 'Success metrics'],
  },
  {
    step: '03',
    title: 'Design',
    description:
      'Wireframes to high-fidelity systems: tokens, components, motion specs and accessible states documented for engineering.',
    tags: ['Design system', 'Prototypes', 'A11y specs'],
  },
  {
    step: '04',
    title: 'Develop',
    description:
      'Production React and TypeScript — component libraries, performance budgets and design-to-code parity enforced in review.',
    tags: ['React + TS', 'Component library', 'Perf budgets'],
  },
];


// ----------------------------------------------------------------------------
// 3. SKILLS SECTION CATEGORY MAPPINGS
// ----------------------------------------------------------------------------

/**
 * Main skill column categories and legacy database category matches.
 */
export const SKILL_CATEGORIES_CONFIG: SkillCategoryMapping[] = [
  {
    key: 'UX & Product Development',
    title: 'UX & Product Development',
    legacyMatches: ['UX & Product Development', 'UX / Product Design'],
  },
  {
    key: 'Front End Development',
    title: 'Front End Development',
    legacyMatches: ['Front End Development', 'Frontend', 'Motion / Interaction'],
  },
  {
    key: 'Tools & Technology',
    title: 'Tools & Technology',
    legacyMatches: ['Tools & Technology', 'Backend', 'Database', 'Tools'],
  },
];


// ----------------------------------------------------------------------------
// 4. FOOTER SECTION DATA & NAV LINKS
// ----------------------------------------------------------------------------

/**
 * Navigation links displayed in the Footer.
 */
export const FOOTER_NAV_LINKS = [
  { name: 'Projects / Case Studies', href: '/projects' },
  { name: 'About & Methodology', href: '/about' },
  { name: 'Experience & History', href: '/experience' },
  { name: 'Get in Touch', href: '/contact' },
  { name: 'Admin Portal', href: '/admin' },
];

/**
 * Generates full list of social links (with SVG icons) for the Footer.
 *
 * @param profile - User profile with social media links and phone number
 * @returns Array of typed SocialItem objects for footer share links
 */
export function getFooterSocialItems(profile: Profile): SocialItem[] {
  const phoneTel = profile.phone ? profile.phone.replace(/\D/g, '') : '8296302220';
  const whatsappUrl = profile.socialLinks?.whatsapp || `https://wa.me/${phoneTel}`;

  return [
    {
      name: 'GitHub',
      href: profile.socialLinks?.github || 'https://github.com/yathish1204',
      icon: React.createElement(
        'svg',
        { className: 'w-5 h-5 shrink-0', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
        })
      ),
    },
    {
      name: 'LinkedIn',
      href: profile.socialLinks?.linkedin || 'https://www.linkedin.com/in/yathishshettigar',
      icon: React.createElement(
        'svg',
        { className: 'w-5 h-5 shrink-0', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
        })
      ),
    },
    {
      name: 'Instagram',
      href: profile.socialLinks?.instagram || 'https://www.instagram.com/y_shettigar_',
      icon: React.createElement(
        'svg',
        { className: 'w-5 h-5 shrink-0', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
        })
      ),
    },
    {
      name: 'Behance',
      href: profile.socialLinks?.behance || 'https://www.behance.net/yathishshettigar',
      icon: React.createElement(
        'svg',
        { className: 'w-5 h-5 shrink-0', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.813 3-3.111 0-5.385-2.221-5.385-5.518 0-3.477 2.371-5.482 5.253-5.482 3.167 0 4.88 2.155 4.88 5.241 0 .422-.053.844-.078 1.055h-7.391c.148 1.547 1.306 2.38 2.734 2.38 1.258 0 2.062-.57 2.384-1.348h2.416zm-4.966-5.414c-1.163 0-2.03.684-2.261 1.942h4.481c-.085-1.196-.89-1.942-2.22-1.942zm-10.76-6.586h-8.000v14h7.458c2.909 0 5.042-1.621 5.042-4.148 0-1.785-1.026-3.08-2.457-3.565 1.066-.486 1.776-1.549 1.776-3.036 0-2.115-1.662-3.251-3.819-3.251zm-4.789 2.456h2.247c1.173 0 1.907.502 1.907 1.394 0 .977-.82 1.488-2.029 1.488h-2.125v-2.882zm0 5.214h2.518c1.328 0 2.148.553 2.148 1.572 0 1.139-.938 1.697-2.277 1.697h-2.389v-4.269z',
        })
      ),
    },
    {
      name: 'Facebook',
      href: profile.socialLinks?.facebook || 'https://www.facebook.com/yathish.shettigar.165',
      icon: React.createElement(
        'svg',
        { className: 'w-5 h-5 shrink-0', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
        })
      ),
    },
    {
      name: 'WhatsApp',
      href: whatsappUrl,
      icon: React.createElement(
        'svg',
        { className: 'w-5 h-5 shrink-0', fill: 'currentColor', viewBox: '0 0 24 24' },
        React.createElement('path', {
          d: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
        })
      ),
    },
    ...(profile.socialLinks?.twitter
      ? [
          {
            name: 'Twitter / X',
            href: profile.socialLinks.twitter || 'https://x.com/YathishShe57208',
            icon: React.createElement(
              'svg',
              { className: 'w-5 h-5 shrink-0', fill: 'currentColor', viewBox: '0 0 24 24' },
              React.createElement('path', {
                d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              })
            ),
          },
        ]
      : []),
  ];
}

