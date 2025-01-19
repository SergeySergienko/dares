import { ObjectId } from 'mongodb';

export interface InspectionModel {
  date: Date;
  tankId: ObjectId;
  external: {
    heatDamage: boolean;
    repainting: boolean;
    odor: boolean;
    bow: boolean;
    bulges: boolean;
    hammerToneTest?: 'yes' | 'no';
    corrosion: boolean;
    description: string;
    damageLocation: string;
    verdict: 'acceptable' | 'marginal' | 'condemn';
  };
  internal: {
    description: string;
    verdict: 'acceptable' | 'marginal' | 'condemn';
  };
  threading: {
    description: string;
    verdict: 'acceptable' | 'marginal' | 'condemn';
  };
  valve: {
    type: 'YOKE' | 'DIN' | 'Other';
    burstDiskReplaced: boolean;
    oRingReplaced: boolean;
    dipTubeReplaced: boolean;
    description: string;
  };
  tankVerdict: 'acceptable' | 'marginal' | 'condemn';
  createdAt: Date;
  updatedAt?: Date;
}
