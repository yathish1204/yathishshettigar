import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminSession } from '@/lib/auth';
import { apiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  const session = getAdminSession(request);
  if (!session) {
    return apiError('UNAUTHORIZED', 'Authentication required', 401);
  }

  try {
    const atlasUri = process.env.MONGODB_URI;
    if (!atlasUri) {
      return NextResponse.json({ success: false, error: 'MONGODB_URI missing in .env.local' });
    }

    const localUri = 'mongodb://127.0.0.1:27017/portfolio';

    console.log('Starting DB Migration from Local to Atlas...');

    // 1. Connect to Local DB
    const localConn = await mongoose.createConnection(localUri).asPromise();
    const localDb = localConn.db;
    if (!localDb) {
      return NextResponse.json({ success: false, error: 'Failed to access local database' });
    }

    const collections = await localDb.listCollections().toArray();
    const dataToMigrate: Record<string, any[]> = {};

    for (const col of collections) {
      const docs = await localDb.collection(col.name).find({}).toArray();
      if (docs.length > 0) {
        dataToMigrate[col.name] = docs;
      }
    }
    await localConn.close();

    // 2. Connect to Atlas DB
    const atlasConn = await mongoose.createConnection(atlasUri).asPromise();
    const atlasDb = atlasConn.db;
    if (!atlasDb) {
      return NextResponse.json({ success: false, error: 'Failed to access Atlas database' });
    }

    const migrationSummary: Record<string, number> = {};

    for (const [colName, docs] of Object.entries(dataToMigrate)) {
      const targetCol = atlasDb.collection(colName);
      await targetCol.deleteMany({});
      if (docs.length > 0) {
        await targetCol.insertMany(docs);
        migrationSummary[colName] = docs.length;
      }
    }
    await atlasConn.close();

    // 3. Reset main Mongoose connection so it connects to Atlas from now on
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (global.mongooseCache) {
      global.mongooseCache.conn = null;
      global.mongooseCache.promise = null;
    }

    await mongoose.connect(atlasUri);
    if (global.mongooseCache) {
      global.mongooseCache.conn = mongoose;
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully migrated all local database data to MongoDB Atlas and reconnected main server to Atlas!',
      databaseName: mongoose.connection.name,
      host: mongoose.connection.host,
      migratedCollections: migrationSummary,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
  }
}
