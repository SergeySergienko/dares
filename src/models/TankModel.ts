export interface TankModel {
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
}

enum Material {
  Aluminium = 'Aluminium',
  Steel = 'Steel',
}

type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
