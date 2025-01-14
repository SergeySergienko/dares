import { ObjectId } from 'mongodb';
import { MaintenanceModel } from '../models';
import { maintenanceRepo } from '../repositories';
import { MaintenanceInputDTO } from '../types';
import { maintenanceModelMapper } from '../utils';

export const maintenanceService = {
  async createMaintenance({ date, parts, tankId }: MaintenanceInputDTO) {
    const newMaintenance: MaintenanceModel = {
      date: new Date(date),
      tankId: ObjectId.createFromHexString(tankId),
      parts,
      createdAt: new Date(),
    };
    const { insertedId } = await maintenanceRepo.createMaintenance(
      newMaintenance
    );

    return maintenanceModelMapper({ ...newMaintenance, _id: insertedId });
  },
};
