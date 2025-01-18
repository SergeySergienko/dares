import { WithId } from 'mongodb';
import { Grade, MaintenanceModel, TankModel } from './models';
import { MaintenanceOutputDTO, TankOutputDTO } from './types';

export const maintenanceModelMapper = (
  maintenance: WithId<MaintenanceModel>
): MaintenanceOutputDTO => {
  const { _id, tankId, ...rest } = maintenance;
  return { id: _id.toString(), tankId: tankId.toString(), ...rest };
};

export const tankModelMapper = (tank: WithId<TankModel>): TankOutputDTO => {
  const { _id, ...rest } = tank;
  return { id: _id.toString(), ...rest };
};

export const isValidGrade = (value: number): value is Grade => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value);
};
