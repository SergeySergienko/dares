import { Grade, Material, TankModel } from '../../models';

export type TankOutputDTO = TankModel & {
  id: string;
};

export type TankQuery = {
  id?: string;
  internalNumber?: string;
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
  sortBy?: 'internalNumber' | 'lastHydrotestDate' | 'lastInspectionDate';
  sortOrder?: 'asc' | 'desc';
  page?: string;
};
