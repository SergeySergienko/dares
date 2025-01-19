export interface TankModel {
  internalNumber: number;
  serialNumber: string;
  manufacturer: string;
  workPressure: number;
  material: Material;
  volume: number;
  lastHydrotestDate: Date;
  lastInspectionDate: Date;
  color?: string;
  grade?: Grade;
  manufactureDate?: Date;
  terminationDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type Material = 'Aluminium' | 'Steel' | 'FRP' | 'Carbon Composite';

export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
