export interface MaintenanceModel {
  date: Date;
  tankId: string;
  parts: {
    [key: string]: number;
  };
  createdAt: Date;
  updatedAt?: Date;
}
