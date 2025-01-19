import { InspectionModel, Verdict } from '../../models';

export type InspectionInputDTO = {
  date: string; // yyyy-mm-dd
  tankId: string;
  tankVerdict: Verdict;
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
  limit?: string;
  sortBy?: 'date' | 'tankId';
  sortOrder?: 'asc' | 'desc';
  page?: string;
};
