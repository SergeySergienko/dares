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
exports.inspectionService = void 0;
const mongodb_1 = require("mongodb");
const api_error_1 = require("../exceptions/api-error");
const utils_1 = require("../utils");
const repositories_1 = require("../repositories");
const _1 = require(".");
exports.inspectionService = {
    getInspectionList(queryObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const inspectionList = yield repositories_1.inspectionRepo.getInspectionList(queryObject);
            if (!inspectionList) {
                throw api_error_1.ApiError.ServerError('Failed to fetch inspection records.');
            }
            return inspectionList.map(utils_1.inspectionModelMapper);
        });
    },
    getInspectionByTankNumber(_a) {
        return __awaiter(this, arguments, void 0, function* ({ tankNumber }) {
            const [tank] = yield _1.tanksService.getTanks({ internalNumber: tankNumber });
            const [lastInspection] = yield exports.inspectionService.getInspectionList({
                tankNumber,
                sortBy: 'date',
                sortOrder: 'desc',
            });
            if (!lastInspection || !tank) {
                throw api_error_1.ApiError.NotFound('Inspection or tank not found');
            }
            const report = Object.assign(Object.assign({}, lastInspection), { tank });
            return report;
        });
    },
    createInspection(_a) {
        return __awaiter(this, void 0, void 0, function* () {
            var { date, tankId, tankVerdict, tankNumber } = _a, rest = __rest(_a, ["date", "tankId", "tankVerdict", "tankNumber"]);
            const normalizedData = (0, utils_1.normalizeInspectionData)(rest);
            const newInspection = Object.assign(Object.assign({}, normalizedData), { date: new Date(date), tankId: mongodb_1.ObjectId.createFromHexString(tankId), tankNumber: Number(tankNumber), tankVerdict, createdAt: new Date() });
            const { insertedId } = yield repositories_1.inspectionRepo.createInspection(newInspection);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('Failed to create inspection record. Please try again later.');
            // Update the tank's last inspection date if the new inspection date is later
            const [tank] = yield _1.tanksService.getTanks({ id: tankId });
            if (new Date(newInspection.date).getTime() >
                new Date(tank.lastInspectionDate).getTime()) {
                yield _1.tanksService.updateTank({
                    id: tankId,
                    lastInspectionDate: newInspection.date,
                });
            }
            return (0, utils_1.inspectionModelMapper)(Object.assign(Object.assign({}, newInspection), { _id: insertedId }));
        });
    },
};
