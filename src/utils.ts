import { WithId } from 'mongodb';
import { Grade, InspectionModel, MaintenanceModel, TankModel } from './models';
import {
  InspectionOutputDTO,
  MaintenanceOutputDTO,
  TankOutputDTO,
} from './types';

export const inspectionModelMapper = (
  inspection: WithId<InspectionModel>
): InspectionOutputDTO => {
  const { _id, tankId, ...rest } = inspection;
  return { id: _id.toString(), tankId: tankId.toString(), ...rest };
};

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

export const isTankId = (identifier: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(identifier);
};

export const isInternalNumber = (identifier: string): boolean => {
  return /^\d{1,4}$/.test(identifier);
};

export const normalizeInspectionData = <T>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeInspectionData(item)) as T;
  } else if (typeof data === 'object' && data !== null) {
    const normalizedObject: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed === 'true') {
          normalizedObject[key] = true;
        } else if (trimmed === 'false') {
          normalizedObject[key] = false;
        } else if (trimmed === '') {
          normalizedObject[key] = null;
        } else {
          normalizedObject[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        normalizedObject[key] = normalizeInspectionData(value);
      } else {
        normalizedObject[key] = value;
      }
    });
    return normalizedObject as T;
  }

  return data;
};
