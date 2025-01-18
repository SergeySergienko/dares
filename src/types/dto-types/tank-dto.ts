import { Grade, Material } from '../../models';

export type TankOutputDTO = {
  id: string;
  tankNumber: number;
  serialNumber: string;
  material: Material;
  volume: number;
  lastHydrotestDate: Date;
  lastInspectionDate: Date;
  hydrotestPeriod: number;
  inspectionPeriod: number;
  grade?: Grade;
  manufactureDate?: Date;
  terminationDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
};

export type TankQuery = {
  id?: string;
  tankNumber?: string;
  serialNumber?: string;
  material?: Material;
  volume?: string;
  startLastHydrotestDate?: string;
  endLastHydrotestDate?: string;
  startLastInspectionDate?: string;
  endLastInspectionDate?: string;
  startGradeValue?: `${Grade}`;
  endGradeValue?: `${Grade}`;
  limit?: string;
  sortBy?: 'date' | 'tankNumber';
  sortOrder?: 'asc' | 'desc';
  page?: string;
};
