import mongoose, { Schema, Document, Model } from 'mongoose';
import { Certification as CertificationType } from '@/types';

export interface ICertificationDocument extends Omit<CertificationType, '_id'>, Document {}

const CertificationSchema = new Schema<ICertificationDocument>(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String },
    credentialId: { type: String },
    credentialUrl: { type: String },
    certificateImage: { type: String },
    thumbnail: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0, index: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.Certification) {
  delete mongoose.models.Certification;
}

export const CertificationModel: Model<ICertificationDocument> =
  mongoose.models.Certification || mongoose.model<ICertificationDocument>('Certification', CertificationSchema);

