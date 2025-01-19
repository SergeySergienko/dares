import { Filter, ObjectId } from 'mongodb';
import { maintenanceCollection } from '../config/db';
import { MaintenanceModel } from '../models';
import { MaintenanceQuery } from '../types';

export const maintenanceRepo = {
  async getMaintenanceList({
    id,
    startDate,
    endDate,
    tankId,
    part,
    limit = '10',
    sortBy = 'date',
    sortOrder = 'desc',
    page = '1',
  }: MaintenanceQuery) {
    const filter: Filter<MaintenanceModel> = {};

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

    if (part) {
      filter[`parts.${part}`] = { $exists: true };
    }

    return await maintenanceCollection
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .toArray();
  },

  async createMaintenance(maintenance: MaintenanceModel) {
    return await maintenanceCollection.insertOne(maintenance);
  },
};
