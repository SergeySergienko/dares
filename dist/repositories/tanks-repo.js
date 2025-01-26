"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tanksRepo = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
const utils_1 = require("../utils");
exports.tanksRepo = {
    getTanks(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, internalNumber, serialNumber, material, volume, valve, color, status, fillingType, startLastHydrotestDate, endLastHydrotestDate, startLastInspectionDate, endLastInspectionDate, startGradeValue, endGradeValue, limit = '10', sortBy = 'internalNumber', sortOrder = 'asc', page = '1', }) {
            const filter = {};
            if (id) {
                filter._id = mongodb_1.ObjectId.createFromHexString(id);
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
                    if ((0, utils_1.isValidGrade)(gradeValue)) {
                        filter.grade.$gte = gradeValue;
                    }
                }
                if (endGradeValue) {
                    const gradeValue = Number(endGradeValue);
                    if ((0, utils_1.isValidGrade)(gradeValue)) {
                        filter.grade.$lte = gradeValue;
                    }
                }
            }
            return yield db_1.tankCollection
                .find(filter)
                .sort({ [sortBy]: sortOrder })
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit))
                .toArray();
        });
    },
    updateTank(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updateData, fieldsToUpdate = __rest(updateData, ["id"]);
            const updateFields = Object.entries(fieldsToUpdate).reduce((acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});
            const result = yield db_1.tankCollection.findOneAndUpdate({ _id: mongodb_1.ObjectId.createFromHexString(id) }, { $set: Object.assign(Object.assign({}, updateFields), { updatedAt: new Date() }) }, { returnDocument: 'after', includeResultMetadata: true });
            return result.value;
        });
    },
};
