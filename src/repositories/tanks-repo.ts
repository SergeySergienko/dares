import { Filter, ObjectId } from 'mongodb';
import { TankModel } from '../models';
import { TankQuery } from '../types';
import { tankCollection } from '../config/db';
import { isValidGrade } from '../utils';

export const tanksRepo = {
  async getTanks({
    id,
    internalNumber,
    serialNumber,
    material,
    volume,
    startLastHydrotestDate,
    endLastHydrotestDate,
    startLastInspectionDate,
    endLastInspectionDate,
    startGradeValue,
    endGradeValue,
    limit = '10',
    sortBy = 'internalNumber',
    sortOrder = 'asc',
    page = '1',
  }: TankQuery) {
    const filter: Filter<TankModel> = {};

    if (id) {
      filter._id = ObjectId.createFromHexString(id);
    }

    if (internalNumber) {
      filter.tankNumber = Number(internalNumber);
    }

    if (serialNumber) {
      filter.serialNumber = serialNumber;
    }

    if (material) {
      filter.material = material;
    }

    if (volume) {
      filter.volume = Number(volume);
    }

    if (startLastHydrotestDate || endLastHydrotestDate) {
      filter.lastHydrotestDate = {};
      if (startLastHydrotestDate) {
        filter.lastHydrotestDate.$gte = new Date(
          startLastHydrotestDate as string
        );
      }
      if (endLastHydrotestDate) {
        filter.lastHydrotestDate.$lte = new Date(
          endLastHydrotestDate as string
        );
      }
    }

    if (startLastInspectionDate || endLastInspectionDate) {
      filter.lastInspectionDate = {};
      if (startLastInspectionDate) {
        filter.lastInspectionDate.$gte = new Date(
          startLastInspectionDate as string
        );
      }
      if (endLastInspectionDate) {
        filter.lastInspectionDate.$lte = new Date(
          endLastInspectionDate as string
        );
      }
    }

    if (startGradeValue || endGradeValue) {
      filter.grade = {};
      if (startGradeValue) {
        const gradeValue = Number(startGradeValue);
        if (isValidGrade(gradeValue)) {
          filter.grade.$gte = gradeValue;
        }
      }
      if (endGradeValue) {
        const gradeValue = Number(endGradeValue);
        if (isValidGrade(gradeValue)) {
          filter.grade.$lte = gradeValue;
        }
      }
    }

    return await tankCollection
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .toArray();
  },
};
