import { ObjectId } from 'mongodb';

export interface InspectionModel {
  date: Date;
  tankId: ObjectId;
  external?: {
    heatDamage?: boolean;
    repainting?: boolean;
    odor?: boolean;
    bow?: boolean;
    bulges?: boolean;
    hammerToneTest?: boolean;
    corrosion?: boolean;
    description?: string;
    damageLocation?: string;
    verdict?: Verdict;
  };
  internal?: {
    description?: string;
    verdict?: Verdict;
  };
  threading?: {
    description?: string;
    verdict?: Verdict;
  };
  valve?: {
    type?: 'YOKE' | 'DIN' | 'Other';
    burstDiskReplaced?: boolean;
    oRingReplaced?: boolean;
    dipTubeReplaced?: boolean;
    description?: string;
  };
  tankVerdict: Verdict;
  stickerAffixed?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type Verdict = 'Acceptable' | 'Marginal' | 'Condemn';
