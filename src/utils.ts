import { WithId } from 'mongodb';
import { MaintenanceModel } from './models';
import { MaintenanceOutputDTO } from './types';

export const maintenanceModelMapper = (
  maintenance: WithId<MaintenanceModel>
): MaintenanceOutputDTO => {
  const { _id, tankId, ...rest } = maintenance;
  return { id: _id.toString(), tankId: tankId.toString(), ...rest };
};
