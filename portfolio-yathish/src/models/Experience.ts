import mongoose, { Schema, Document, Model } from 'mongoose';
import { Experience as ExperienceType } from '@/types';

export interface IExperienceDocument extends Omit<ExperienceType, '_id'>, Document {}

const ExperienceSchema = new Schema<IExperienceDocument>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    employmentType: { type: String },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    isLatestEmployer: { type: Boolean, default: false },
    summary: { type: String, required: true },
    responsibilities: [{ type: String }],
    achievements: [{ type: String }],
    technologies: [{ type: String }],
    order: { type: Number, default: 0, index: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.Experience) {
  delete mongoose.models.Experience;
}

export const ExperienceModel: Model<IExperienceDocument> =
  mongoose.models.Experience || mongoose.model<ISkillDocument>('Experience', ExperienceSchema);

