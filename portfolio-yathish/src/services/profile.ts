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
  heroVideoUrl: '',
  heroVideoPoster: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
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
      heroVideoUrl: profileDoc.heroVideoUrl || DEFAULT_PROFILE.heroVideoUrl,
      heroVideoPoster: profileDoc.heroVideoPoster || DEFAULT_PROFILE.heroVideoPoster,
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
