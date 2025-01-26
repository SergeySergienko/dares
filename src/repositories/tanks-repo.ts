import { Filter, ObjectId } from 'mongodb';
import { TankModel } from '../models';
import { TankQuery, TankUpdateDTO } from '../types';
import { tankCollection } from '../config/db';
import { isValidGrade } from '../utils';

export const tanksRepo = {
  async getTanks({
    id,
    internalNumber,
    serialNumber,
    material,
    volume,
    valve,
    color,
    status,
    fillingType,
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
      filter.internalNumber = Number(internalNumber);
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

    if (valve) {
      filter.valve = valve;
    }

    if (color) {
      filter.color = color;
    }

    if (status) {
      filter.status = status;
    }

    if (fillingType) {
      filter.fillingType = fillingType;
    }

    if (startLastHydrotestDate || endLastHydrotestDate) {
      filter.lastHydrotestDate = {};
      if (startLastHydrotestDate) {
        filter.lastHydrotestDate.$gte = new Date(startLastHydrotestDate);
      }
      if (endLastHydrotestDate) {
        filter.lastHydrotestDate.$lte = new Date(endLastHydrotestDate);
      }
    }

    if (startLastInspectionDate || endLastInspectionDate) {
      filter.lastInspectionDate = {};
      if (startLastInspectionDate) {
        filter.lastInspectionDate.$gte = new Date(startLastInspectionDate);
      }
      if (endLastInspectionDate) {
        filter.lastInspectionDate.$lte = new Date(endLastInspectionDate);
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

  async updateTank(updateData: TankUpdateDTO) {
    const { id, ...fieldsToUpdate } = updateData;

    const updateFields = Object.entries(fieldsToUpdate).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {}
    );

    const result = await tankCollection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { ...updateFields, updatedAt: new Date() } },
      { returnDocument: 'after', includeResultMetadata: true }
    );

    return result.value;
  },
};
