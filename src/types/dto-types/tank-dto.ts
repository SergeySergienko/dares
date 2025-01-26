import {
  Color,
  FillingType,
  Grade,
  Manufacturer,
  Material,
  Status,
  TankModel,
  Valve,
} from '../../models';

export type TankInputDTO = {
  internalNumber: string;
  serialNumber: string;
  manufacturer: Manufacturer;
  workPressure: string;
  material: Material;
  volume: string;
  valve?: Valve;
  color: Color;
  status: Status;
  fillingType: FillingType;
  firstHydrotestDate: Date;
  lastHydrotestDate: Date;
  lastInspectionDate: Date;
  grade?: `${Grade}`;
  manufactureDate?: Date;
  terminationDate?: Date;
};

export type TankOutputDTO = TankModel & {
  id: string;
};

export type TankUpdateDTO = Omit<
  Partial<TankModel>,
  'createdAt' | 'updatedAt'
> & {
  id: string;
};

export type TankQuery = {
  id?: string;
  internalNumber?: string;
  serialNumber?: string;
  material?: Material;
  volume?: string;
  valve?: Valve;
  color?: Color;
  status?: Status;
  fillingType?: FillingType;
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
