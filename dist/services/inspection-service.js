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
exports.inspectionService = void 0;
const mongodb_1 = require("mongodb");
const api_error_1 = require("../exceptions/api-error");
const inspection_repo_1 = require("../repositories/inspection-repo");
const utils_1 = require("../utils");
const tanks_service_1 = require("./tanks-service");
exports.inspectionService = {
    getInspectionList(queryObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const inspectionList = yield inspection_repo_1.inspectionRepo.getInspectionList(queryObject);
            if (!inspectionList) {
                throw api_error_1.ApiError.ServerError('Failed to fetch inspection records.');
            }
            return inspectionList.map(utils_1.inspectionModelMapper);
        });
    },
    createInspection(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, tankId, tankVerdict }) {
            const newInspection = {
                date: new Date(date),
                tankId: mongodb_1.ObjectId.createFromHexString(tankId),
                tankVerdict,
                createdAt: new Date(),
            };
            const { insertedId } = yield inspection_repo_1.inspectionRepo.createInspection(newInspection);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('Failed to create inspection record. Please try again later.');
            yield tanks_service_1.tanksService.updateTank({
                id: tankId,
                lastInspectionDate: new Date(date),
            });
            return (0, utils_1.inspectionModelMapper)(Object.assign(Object.assign({}, newInspection), { _id: insertedId }));
        });
    },
};
