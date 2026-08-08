import mongoose, { Schema, Document, Model } from 'mongoose';
import { Hobby as HobbyType } from '@/types';

export interface IHobbyDocument extends Omit<HobbyType, '_id'>, Document {}

const HobbySchema = new Schema<IHobbyDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    image: { type: String },
    order: { type: Number, default: 0, index: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
  },
  { timestamps: true }
);

export const HobbyModel: Model<IHobbyDocument> =
  (mongoose.models && mongoose.models.Hobby) ||
  mongoose.model<IHobbyDocument>('Hobby', HobbySchema);

