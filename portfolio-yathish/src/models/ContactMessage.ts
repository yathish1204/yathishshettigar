import mongoose, { Schema, Document, Model } from 'mongoose';
import { ContactMessage as ContactMessageType } from '@/types';

export interface IContactMessageDocument extends Omit<ContactMessageType, '_id'>, Document {}

const ContactMessageSchema = new Schema<IContactMessageDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ContactMessageModel: Model<IContactMessageDocument> =
  (mongoose.models && mongoose.models.ContactMessage) ||
  mongoose.model<IContactMessageDocument>('ContactMessage', ContactMessageSchema);

