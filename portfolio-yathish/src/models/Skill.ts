import mongoose, { Schema, Document, Model } from 'mongoose';
import { Skill as SkillType } from '@/types';

export interface ISkillDocument extends Omit<SkillType, '_id'>, Document {}

const SkillSchema = new Schema<ISkillDocument>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['UX / Product Design', 'Frontend', 'Backend', 'Database', 'Tools', 'Motion / Interaction'],
      required: true,
      index: true,
    },
    proficiency: { type: Number },
    yearsOfExperience: { type: Number },
    icon: { type: String },
    order: { type: Number, default: 0, index: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
  },
  { timestamps: true }
);

export const SkillModel: Model<ISkillDocument> =
  (mongoose.models && mongoose.models.Skill) ||
  mongoose.model<ISkillDocument>('Skill', SkillSchema);

