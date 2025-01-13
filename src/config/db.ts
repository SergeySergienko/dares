import { MongoClient } from 'mongodb';
import { PartModel, TankModel } from '../models';

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('\n--------------------------------------------');
    console.log(
      '\x1b[35m%s\x1b[0m',
      `[OK] You successfully connected to ${
        client.options?.appName || 'MongoDB'
      }!`
    );
    const db = client.db('dares_db');
    await db
      .collection<TankModel>('tanks')
      .createIndex({ serialNumber: 1 }, { unique: true });
    await db
      .collection<PartModel>('parts')
      .createIndex({ alias: 1 }, { unique: true });
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default client;
