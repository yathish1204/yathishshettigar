import { connectToDatabase } from '@/lib/mongodb';
import { ProfileModel } from '@/models/Profile';
import { Profile } from '@/types';

export const DEFAULT_PROFILE: Profile = {
  name: 'Yathish Shettigar',
  title: 'Senior UX Engineer & Frontend Architect',
  tagline: 'Bridging intuitive human-centered design with high-performance React & Next.js engineering.',
  shortBio:
    'UX Engineer combining product design, frontend architecture, React, Next.js, and interaction design to build enterprise-grade web applications.',
  longBio:
    'I design and build production web applications that blend human-centered UX design with clean, scalable frontend engineering. With expertise across design systems, web performance, web accessibility, and full-stack Next.js architecture, I partner with engineering and product leaders to deliver exceptional user experiences.',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  resumeUrl: '#resume',
  email: 'yathish.shettigar@example.com',
  location: 'Bengaluru, India',
  availability: 'Available for Senior UX Engineer & Frontend Architect roles',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    website: 'https://yathish.dev',
  },
};

export async function getProfile(): Promise<Profile> {
  try {
    const db = await connectToDatabase();
    if (!db) return DEFAULT_PROFILE;

    const profileDoc = await ProfileModel.findOne().lean();
    if (!profileDoc) return DEFAULT_PROFILE;

    return {
      _id: profileDoc._id.toString(),
      name: profileDoc.name,
      title: profileDoc.title,
      tagline: profileDoc.tagline,
      shortBio: profileDoc.shortBio,
      longBio: profileDoc.longBio,
      profileImage: profileDoc.profileImage || DEFAULT_PROFILE.profileImage,
      resumeUrl: profileDoc.resumeUrl || DEFAULT_PROFILE.resumeUrl,
      email: profileDoc.email,
      phone: profileDoc.phone,
      location: profileDoc.location,
      socialLinks: profileDoc.socialLinks || DEFAULT_PROFILE.socialLinks,
      availability: profileDoc.availability || DEFAULT_PROFILE.availability,
      updatedAt: profileDoc.updatedAt ? new Date(profileDoc.updatedAt).toISOString() : undefined,
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return DEFAULT_PROFILE;
  }
}
