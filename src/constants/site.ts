import { type SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Present Company Included',
  description: 'A modern, accessible, and performant website built with Next.js and Tailwind CSS.',
  url: 'https://presentcompanyincluded.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/presentcompany',
    github: 'https://github.com/presentcompany',
    linkedin: 'https://linkedin.com/company/presentcompany',
  },
};

export const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const socialLinks = [
  {
    name: 'Twitter',
    href: siteConfig.links.twitter,
    icon: 'twitter',
  },
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: 'linkedin',
  },
];

