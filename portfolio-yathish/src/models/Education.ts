import mongoose, { Schema, Document, Model } from 'mongoose';
import { Education as EducationType } from '@/types';

export interface IEducationDocument extends Omit<EducationType, '_id'>, Document {}

const EducationSchema = new Schema<IEducationDocument>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    description: { type: String },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const EducationModel: Model<IEducationDocument> =
  (mongoose.models && mongoose.models.Education) ||
  mongoose.model<IEducationDocument>('Education', EducationSchema);

