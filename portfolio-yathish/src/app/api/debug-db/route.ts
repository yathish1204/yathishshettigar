import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, error: 'Database connection returned null' });
    }

    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ success: false, error: 'mongoose.connection.db is undefined' });
    }

    const dbName = db.databaseName;
    const collections = await db.listCollections().toArray();

    const collectionData: Record<string, { count: number; docs: any[] }> = {};

    for (const col of collections) {
      const docs = await db.collection(col.name).find({}).toArray();
      collectionData[col.name] = {
        count: docs.length,
        docs: docs.map((d) => ({ ...d, _id: d._id.toString() })),
      };
    }

    return NextResponse.json({
      success: true,
      envMongoUri: process.env.MONGODB_URI,
      databaseName: dbName,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      collectionsCount: collections.length,
      collections: collectionData,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
  }
}
