import { Grade, InspectionModel } from '../../models';

export type InspectionInputDTO = Omit<
  InspectionModel,
  'date' | 'tankId' | 'tankNumber' | 'grade' | 'createdAt' | 'updatedAt'
> & {
  date: string;
  tankId: string;
  tankNumber: string;
  grade?: `${Grade}`;
};

export type InspectionOutputDTO = Omit<InspectionModel, 'tankId'> & {
  id: string;
  tankId: string;
};

export type InspectionQuery = {
  id?: string;
  startDate?: string;
  endDate?: string;
  tankId?: string;
  tankNumber?: string;
  limit?: string;
  sortBy?: 'date' | 'tankId';
  sortOrder?: 'asc' | 'desc';
  page?: string;
};
