import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const atlasUri = process.env.MONGODB_URI;
const localUri = 'mongodb://127.0.0.1:27017/portfolio';

console.log('Atlas URI:', atlasUri);
console.log('Local URI:', localUri);

async function migrate() {
  try {
    console.log('\n--- Step 1: Connecting to Local DB ---');
    const localConn = await mongoose.createConnection(localUri).asPromise();
    console.log('Connected to Local DB successfully!');

    const localDb = localConn.db;
    const collections = await localDb.listCollections().toArray();
    console.log('Local Collections:', collections.map((c) => c.name));

    const dataToMigrate = {};

    for (const col of collections) {
      const docs = await localDb.collection(col.name).find({}).toArray();
      if (docs.length > 0) {
        dataToMigrate[col.name] = docs;
        console.log(`Extracted ${docs.length} documents from local collection '${col.name}'`);
      }
    }

    await localConn.close();

    console.log('\n--- Step 2: Connecting to MongoDB Atlas ---');
    const atlasConn = await mongoose.createConnection(atlasUri).asPromise();
    console.log('Connected to MongoDB Atlas successfully! DB Name:', atlasConn.db.databaseName);

    const atlasDb = atlasConn.db;

    for (const [colName, docs] of Object.entries(dataToMigrate)) {
      console.log(`Migrating ${docs.length} documents into Atlas collection '${colName}'...`);
      const targetCol = atlasDb.collection(colName);
      
      // Clear target collection first so we don't have duplicates
      await targetCol.deleteMany({});
      
      if (docs.length > 0) {
        await targetCol.insertMany(docs);
        console.log(`Successfully migrated ${docs.length} documents to Atlas '${colName}'!`);
      }
    }

    await atlasConn.close();
    console.log('\nMigration complete! All local data is now stored in MongoDB Atlas.');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();
