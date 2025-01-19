import { ObjectId } from 'mongodb';

export interface HydroTestModel {
  date: Date;
  tankId: ObjectId;
  tester: string;
  createdAt: Date;
  updatedAt?: Date;
}
