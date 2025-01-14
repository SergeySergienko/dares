import { maintenanceCollection } from '../config/db';
import { MaintenanceModel } from '../models';

export const maintenanceRepo = {
  async createMaintenance(maintenance: MaintenanceModel) {
    return await maintenanceCollection.insertOne(maintenance);
  },
};
