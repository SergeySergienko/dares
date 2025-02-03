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
exports.reportsService = void 0;
const api_error_1 = require("../exceptions/api-error");
const _1 = require(".");
const utils_1 = require("../utils");
exports.reportsService = {
    generateInspectionReport(_a) {
        return __awaiter(this, arguments, void 0, function* ({ inspectionId, tankId, }) {
            const [inspection] = yield _1.inspectionService.getInspectionList({
                id: inspectionId,
            });
            const [tank] = yield _1.tanksService.getTanks({ id: tankId });
            if (!inspection || !tank) {
                throw api_error_1.ApiError.NotFound('Inspection or tank not found');
            }
            if (inspection.tankId !== tank.id) {
                throw api_error_1.ApiError.UnprocessableEntity('Inspection and tank do not match');
            }
            const report = Object.assign(Object.assign({}, inspection), { tank });
            return report;
        });
    },
    generateLastInspectionReport(_a) {
        return __awaiter(this, arguments, void 0, function* ({ tankId }) {
            const [tank] = yield _1.tanksService.getTanks({ id: tankId });
            const [lastInspection] = yield _1.inspectionService.getInspectionList({
                tankId,
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
    getLastInspectionByTankIdentifier(_a) {
        return __awaiter(this, arguments, void 0, function* ({ tankIdentifier, inspectionId, }) {
            if (!tankIdentifier) {
                throw api_error_1.ApiError.BadRequest(400, 'tankIdentifier is required');
            }
            let tankQueryObject;
            if ((0, utils_1.isTankId)(tankIdentifier)) {
                tankQueryObject = { id: tankIdentifier };
            }
            else if ((0, utils_1.isInternalNumber)(tankIdentifier)) {
                tankQueryObject = { internalNumber: tankIdentifier };
            }
            else {
                throw api_error_1.ApiError.BadRequest(400, 'Invalid tankIdentifier format');
            }
            const [tank] = yield _1.tanksService.getTanks(tankQueryObject);
            let inspectionQueryObject;
            if (inspectionId) {
                inspectionQueryObject = {
                    id: inspectionId,
                };
            }
            else if ((0, utils_1.isTankId)(tankIdentifier)) {
                inspectionQueryObject = {
                    tankId: tankIdentifier,
                    sortBy: 'date',
                    sortOrder: 'desc',
                };
            }
            else {
                inspectionQueryObject = {
                    tankNumber: tankIdentifier,
                    sortBy: 'date',
                    sortOrder: 'desc',
                };
            }
            const [inspection] = yield _1.inspectionService.getInspectionList(inspectionQueryObject);
            if (!inspection || !tank) {
                throw api_error_1.ApiError.NotFound('Inspection or tank not found');
            }
            if (inspection.tankId !== tank.id) {
                throw api_error_1.ApiError.UnprocessableEntity('Inspection and tank do not match');
            }
            const report = Object.assign(Object.assign({}, inspection), { tank });
            return report;
        });
    },
};
