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
    'I design and build production web applications that blend human-centered UX design with clean, scalable frontend engineering. With expertise across design systems, web performance, web accessibility, and full-stack Next.js architecture, I partner with engineering and product leaders to deliver exceptional user experiences.',
  profileImage: 'https://res.cloudinary.com/ddzrfwfsl/image/upload/q_auto,f_auto/v1786337057/yathish-hero-poster-img_1_qfd3fd.png',
  heroVideoUrl: '',
  heroVideoPoster: 'https://res.cloudinary.com/ddzrfwfsl/image/upload/q_auto,f_auto/v1786337057/yathish-hero-poster-img_1_qfd3fd.png',
  heroVideoUrlLight: '',
  heroVideoPosterLight: '',
  resumeUrl: '#resume',
  email: 'yathish120420@gmail.com',
  location: 'Bengaluru, India',
  availability: 'Available for UX Enginner | Product Designer & Front-end Developer role',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    website: 'https://yathish.dev',
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
      profileImage: profileDoc.profileImage || DEFAULT_PROFILE.profileImage,
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
