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
    bellLike?: 'yes' | 'no';
    corrosion: boolean;
    description: string;
    damageLocation: string;
    verdict: 'acceptable' | 'marginal' | 'condemn';
  };
  internal: {
    content: string;
    description: string;
    damageLocation: string;
    verdict: 'acceptable' | 'marginal' | 'condemn';
  };
  threading: {
    description: string;
    damagedThreadsAmount: number;
    crackAssessment: string;
    oRingAssessment: string;
    verdict: 'acceptable' | 'marginal' | 'condemn';
  };
  eddyCurrentTest: {
    instrument: string;
    model: string;
    serialNumber: string;
    verdict: 'acceptable' | 'marginal' | 'condemn';
  };
  valve: {
    burstDiskReplaced: boolean;
    oRing: boolean;
    dipTube: boolean;
    serviceNeeded: boolean;
  };
  tankVerdict: 'acceptable' | 'marginal' | 'condemn';
  sticker: {
    internalNumber: number;
    date: Date;
  };
  createdAt: Date;
  updatedAt?: Date;
}
