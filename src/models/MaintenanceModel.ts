import { ObjectId } from 'mongodb';

export interface MaintenanceModel {
  date: Date;
  tankId: ObjectId;
  parts: {
    [key: string]: number;
  };
  createdAt: Date;
  updatedAt?: Date;
}
