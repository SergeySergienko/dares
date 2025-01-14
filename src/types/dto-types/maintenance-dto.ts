export type MaintenanceInputDTO = {
  date: string; // yyyy-mm-dd
  tankId: string;
  parts: {
    [key: string]: number;
  };
};

export type MaintenanceOutputDTO = {
  id: string;
  date: Date;
  tankId: string;
  parts: {
    [key: string]: number;
  };
  createdAt: Date;
  updatedAt?: Date;
};
