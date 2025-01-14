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
exports.maintenanceService = {
    createMaintenance(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, parts, tankId }) {
            const newMaintenance = {
                date: new Date(date),
                tankId: mongodb_1.ObjectId.createFromHexString(tankId),
                parts,
                createdAt: new Date(),
            };
            const { insertedId } = yield repositories_1.maintenanceRepo.createMaintenance(newMaintenance);
            return (0, utils_1.maintenanceModelMapper)(Object.assign(Object.assign({}, newMaintenance), { _id: insertedId }));
        });
    },
};
