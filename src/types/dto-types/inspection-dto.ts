import { InspectionModel } from '../../models';

export type InspectionOutputDTO = Omit<InspectionModel, 'tankId'> & {
  id: string;
  tankId: string;
};

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
