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
const inspection_service_1 = require("./inspection-service");
const tanks_service_1 = require("./tanks-service");
exports.reportsService = {
    generateInspectionReport(_a) {
        return __awaiter(this, arguments, void 0, function* ({ inspectionId, tankId, }) {
            const [inspection] = yield inspection_service_1.inspectionService.getInspectionList({
                id: inspectionId,
            });
            const [tank] = yield tanks_service_1.tanksService.getTanks({ id: tankId });
            if (!inspection || !tank) {
                throw api_error_1.ApiError.NotFound('Inspection or tank not found');
            }
            if (inspection.tankId !== tank.id) {
                throw api_error_1.ApiError.UnprocessableEntity('Inspection and tank do not match');
            }
            const report = {
                date: inspection.date,
                tankVerdict: inspection.tankVerdict,
                tank,
            };
            return report;
        });
    },
};
