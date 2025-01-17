import { ObjectId } from 'mongodb';
import { MaintenanceModel } from '../models';
import { maintenanceRepo } from '../repositories';
import { MaintenanceInputDTO, MaintenanceQuery } from '../types';
import { maintenanceModelMapper } from '../utils';
import { ApiError } from '../exceptions/api-error';

export const maintenanceService = {
  async getMaintenanceList(queryObject: MaintenanceQuery) {
    const maintenanceList = await maintenanceRepo.getMaintenanceList(
      queryObject
    );
    if (!maintenanceList) {
      throw ApiError.ServerError('Failed to fetch maintenance records.');
    }

    return maintenanceList.map(maintenanceModelMapper);
  },

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
    if (!insertedId)
      throw ApiError.ServerError(
        'Failed to create maintenance record. Please try again later.'
      );

    return maintenanceModelMapper({ ...newMaintenance, _id: insertedId });
  },
};
