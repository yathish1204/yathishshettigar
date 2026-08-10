import { cache } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { ProfileModel } from '@/models/Profile';
import { Profile } from '@/types';

export const DEFAULT_PROFILE: Profile = {
  name: 'Yathish Shettigar',
  title: 'UX Engineer & Frontend Architect',
  tagline: 'Bridging intuitive human-centered design with high-performance React & Next.js engineering.',
  shortBio:
    'UX Engineer combining product design, frontend architecture, React, Next.js, and interaction design to build enterprise-grade web applications.',
  longBio:
    `I am a UX Engineer with 2 years of experience working at the intersection of design and frontend development. I specialize in turning user needs and design concepts into accessible, responsive, and high-performing web experiences using React, Next.js, and modern frontend technologies. For me, engineering is not just about making interfaces function correctly, but about ensuring they feel intuitive, smooth, and meaningful for the people using them.
    
    My process always begins with understanding the user. Before jumping into components, layouts, or code, I focus on what the user is trying to achieve and where they might face friction. This mindset helps me design and build experiences that are simple, clear, and thoughtful. I pay close attention to details like hierarchy, feedback, interaction flow, and accessibility, because I believe these small elements collectively shape how natural and effortless a product feels.

    Working across both design and development has given me a balanced perspective on building digital products. I can translate Figma designs into functional React components while ensuring responsiveness, performance, and design accuracy. At the same time, I design with real-world constraints in mind, such as scalability, maintainability, and browser behavior. I enjoy building clean, reusable interfaces and always aim to create experiences that are not only visually consistent but also accessible and user-friendly.
`,
  profileImage: 'https://res.cloudinary.com/ddzrfwfsl/image/upload/q_auto,f_auto/v1786337057/yathish-hero-poster-img_1_qfd3fd.png',
  heroVideoUrl: '',
  heroVideoPoster: 'https://res.cloudinary.com/ddzrfwfsl/image/upload/q_auto,f_auto/v1786337057/yathish-hero-poster-img_1_qfd3fd.png',
  heroVideoUrlLight: 'https://res.cloudinary.com/ddzrfwfsl/video/upload/q_auto,f_auto/v1786341514/gemini_generated_video_a0468cd0_cl0ajn.mp4',
  heroVideoPosterLight: '',
  resumeUrl: '#resume',
  email: 'yathish120420@gmail.com',
  location: 'Bengaluru, India',
  availability: 'Available for UX Enginner | Product Designer & Front-end Developer role',
  socialLinks: {
    github: 'https://github.com/yathish1204',
    linkedin: 'https://www.linkedin.com/in/yathishshettigar?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    twitter: 'https://x.com/YathishShe57208',
    website: 'https://yathishshettigar.site',
  },
};

let cachedProfile: Profile | null = null;
let lastProfileFetch = 0;
const CACHE_TTL = 30000; // 30 seconds

export const getProfile = cache(async function getProfile(): Promise<Profile> {
  const now = Date.now();
  if (cachedProfile && now - lastProfileFetch < CACHE_TTL) {
    return cachedProfile;
  }

  try {
    const db = await connectToDatabase();
    if (!db) return cachedProfile || DEFAULT_PROFILE;

    const profileDoc = await ProfileModel.findOne().lean();
    if (!profileDoc) {
      cachedProfile = DEFAULT_PROFILE;
      lastProfileFetch = now;
      return DEFAULT_PROFILE;
    }

    const formatted: Profile = {
      _id: profileDoc._id.toString(),
      name: profileDoc.name,
      title: profileDoc.title,
      tagline: profileDoc.tagline,
      shortBio: profileDoc.shortBio,
      longBio: profileDoc.longBio,
      profileImage: (profileDoc.profileImage && !profileDoc.profileImage.includes('unsplash.com'))
        ? profileDoc.profileImage
        : 'https://res.cloudinary.com/ddzrfwfsl/image/upload/v1786337057/yathish-hero-poster-img_1_qfd3fd.png',
      heroVideoUrl: profileDoc.heroVideoUrl || DEFAULT_PROFILE.heroVideoUrl,
      heroVideoPoster: profileDoc.heroVideoPoster || DEFAULT_PROFILE.heroVideoPoster,
      heroVideoUrlLight: profileDoc.heroVideoUrlLight || DEFAULT_PROFILE.heroVideoUrlLight,
      heroVideoPosterLight: profileDoc.heroVideoPosterLight || DEFAULT_PROFILE.heroVideoPosterLight,
      resumeUrl: profileDoc.resumeUrl || DEFAULT_PROFILE.resumeUrl,
      email: profileDoc.email,
      phone: profileDoc.phone,
      location: profileDoc.location,
      socialLinks: profileDoc.socialLinks || DEFAULT_PROFILE.socialLinks,
      availability: profileDoc.availability || DEFAULT_PROFILE.availability,
      updatedAt: profileDoc.updatedAt ? new Date(profileDoc.updatedAt).toISOString() : undefined,
    };

    cachedProfile = formatted;
    lastProfileFetch = now;
    return formatted;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return cachedProfile || DEFAULT_PROFILE;
  }
});

export async function updateProfile(data: Partial<Profile>): Promise<{ success: boolean; profile?: Profile; error?: string }> {
  try {
    const db = await connectToDatabase();
    if (!db) return { success: false, error: 'Database connection unavailable' };

    const existing = await ProfileModel.findOne();
    let updated;
    if (existing) {
      updated = await ProfileModel.findByIdAndUpdate(existing._id, { $set: data }, { new: true, runValidators: true }).lean();
    } else {
      updated = await ProfileModel.create(data);
    }

    if (!updated) return { success: false, error: 'Failed to update profile' };

    cachedProfile = null;
    lastProfileFetch = 0;

    return {
      success: true,
      profile: {
        _id: updated._id.toString(),
        name: updated.name,
        title: updated.title,
        tagline: updated.tagline,
        shortBio: updated.shortBio,
        longBio: updated.longBio,
        profileImage: updated.profileImage,
        heroVideoUrl: updated.heroVideoUrl,
        heroVideoPoster: updated.heroVideoPoster,
        heroVideoUrlLight: updated.heroVideoUrlLight,
        heroVideoPosterLight: updated.heroVideoPosterLight,
        resumeUrl: updated.resumeUrl,
        email: updated.email,
        phone: updated.phone,
        location: updated.location,
        socialLinks: updated.socialLinks,
        availability: updated.availability,
      },
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: 'Database error updating profile' };
  }
}
