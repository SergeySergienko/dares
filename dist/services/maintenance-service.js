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
exports.maintenanceService = void 0;
const mongodb_1 = require("mongodb");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const api_error_1 = require("../exceptions/api-error");
exports.maintenanceService = {
    getMaintenanceList(queryObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const maintenanceList = yield repositories_1.maintenanceRepo.getMaintenanceList(queryObject);
            if (!maintenanceList) {
                throw api_error_1.ApiError.ServerError('Failed to fetch maintenance records.');
            }
            return maintenanceList.map(utils_1.maintenanceModelMapper);
        });
    },
    createMaintenance(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, parts, tankId }) {
            const newMaintenance = {
                date: new Date(date),
                tankId: mongodb_1.ObjectId.createFromHexString(tankId),
                parts,
                createdAt: new Date(),
            };
            const { insertedId } = yield repositories_1.maintenanceRepo.createMaintenance(newMaintenance);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('Failed to create maintenance record. Please try again later.');
            return (0, utils_1.maintenanceModelMapper)(Object.assign(Object.assign({}, newMaintenance), { _id: insertedId }));
        });
    },
};
