import mongoose, { Schema, Document, Model } from 'mongoose';
import { Profile as ProfileType } from '@/types';

export interface IProfileDocument extends Omit<ProfileType, '_id'>, Document {}

const ProfileSchema = new Schema<IProfileDocument>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    shortBio: { type: String, required: true },
    longBio: { type: String, required: true },
    profileImage: { type: String },
    heroVideoUrl: { type: String },
    heroVideoPoster: { type: String },
    heroVideoUrlLight: { type: String },
    heroVideoPosterLight: { type: String },
    resumeUrl: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String, required: true },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
    availability: { type: String },
  },
  { timestamps: true }
);

export const ProfileModel: Model<IProfileDocument> =
  (mongoose.models && mongoose.models.Profile) ||
  mongoose.model<IProfileDocument>('Profile', ProfileSchema);

