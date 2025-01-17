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
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceRepo = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
exports.maintenanceRepo = {
    getMaintenanceList(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, startDate, endDate, tankId, part, limit = '10', sortBy = 'date', sortOrder = 'desc', page = '1', }) {
            const filter = {};
            if (id) {
                filter._id = mongodb_1.ObjectId.createFromHexString(id);
            }
            if (startDate || endDate) {
                filter.date = {};
                if (startDate) {
                    filter.date.$gte = new Date(startDate);
                }
                if (endDate) {
                    filter.date.$lte = new Date(endDate);
                }
            }
            if (tankId) {
                filter.tankId = mongodb_1.ObjectId.createFromHexString(tankId);
            }
            if (part) {
                filter[`parts.${part}`] = { $exists: true };
            }
            return yield db_1.maintenanceCollection
                .find(filter)
                .sort({ [sortBy]: sortOrder })
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit))
                .toArray();
        });
    },
    createMaintenance(maintenance) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.maintenanceCollection.insertOne(maintenance);
        });
    },
};
