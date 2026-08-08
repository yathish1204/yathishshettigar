import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
console.log('Connecting to URI:', uri);

async function test() {
  try {
    await mongoose.connect(uri);
    console.log('Connected successfully!');
    console.log('Database Name:', mongoose.connection.name);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in DB:', collections.map((c) => c.name));

    for (const col of collections) {
      const docs = await mongoose.connection.db.collection(col.name).find({}).toArray();
      console.log(`\n--- Collection: ${col.name} (Count: ${docs.length}) ---`);
      docs.forEach((doc) => {
        console.log(JSON.stringify(doc, null, 2));
      });
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Test Error:', err);
  }
}

test();
