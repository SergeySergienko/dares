import { Filter, ObjectId } from 'mongodb';
import { inspectionCollection } from '../config/db';
import { InspectionModel } from '../models';
import { InspectionQuery } from '../types';

export const inspectionRepo = {
  async getInspectionList({
    id,
    startDate,
    endDate,
    tankId,
    limit = '10',
    sortBy = 'date',
    sortOrder = 'desc',
    page = '1',
  }: InspectionQuery) {
    const filter: Filter<InspectionModel> = {};

    if (id) {
      filter._id = ObjectId.createFromHexString(id);
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate as string);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate as string);
      }
    }
    if (tankId) {
      filter.tankId = ObjectId.createFromHexString(tankId);
    }

    return await inspectionCollection
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .toArray();
  },

  async createInspection(inspection: InspectionModel) {
    return await inspectionCollection.insertOne(inspection);
  },
};
