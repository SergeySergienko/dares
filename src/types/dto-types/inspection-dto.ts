// export type MaintenanceInputDTO = {
//   date: string; // yyyy-mm-dd
//   tankId: string;
//   parts: {
//     [key: string]: number;
//   };
// };

// export type MaintenanceOutputDTO = {
//   id: string;
//   date: Date;
//   tankId: string;
//   parts: {
//     [key: string]: number;
//   };
//   createdAt: Date;
//   updatedAt?: Date;
// };

export type InspectionQuery = {
  id?: string;
  startDate?: string;
  endDate?: string;
  tankId?: string;
  limit?: string;
  sortBy?: 'date' | 'tankId';
  sortOrder?: 'asc' | 'desc';
  page?: string;
};
