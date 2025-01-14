import { MongoClient } from 'mongodb';
import { MaintenanceModel, PartModel, TankModel } from '../models';

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

const db = client.db('dares_db');
export const maintenanceCollection =
  db.collection<MaintenanceModel>('maintenance');
export const tankCollection = db.collection<TankModel>('tanks');
export const partCollection = db.collection<PartModel>('parts');

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
    await tankCollection.createIndex({ serialNumber: 1 }, { unique: true });
    await partCollection.createIndex({ alias: 1 }, { unique: true });

    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default client;
