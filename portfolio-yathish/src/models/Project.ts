import mongoose, { Schema, Document, Model } from 'mongoose';
import { Project as ProjectType } from '@/types';

export interface IProjectDocument extends Omit<ProjectType, '_id'>, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    role: { type: String, required: true },
    client: { type: String },
    duration: { type: String },
    year: { type: Schema.Types.Mixed, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    technologies: [{ type: String, required: true }],
    responsibilities: [{ type: String }],
    challenge: { type: String },
    research: { type: String },
    designProcess: { type: String },
    solution: { type: String },
    outcome: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    order: { type: Number, default: 0, index: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    ogImage: { type: String },
  },
  { timestamps: true }
);

export const ProjectModel: Model<IProjectDocument> =
  (mongoose.models && mongoose.models.Project) ||
  mongoose.model<IProjectDocument>('Project', ProjectSchema);

