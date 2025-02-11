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
exports.inspectionController = void 0;
const services_1 = require("../services");
exports.inspectionController = {
    getInspectionList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inspectionList = yield services_1.inspectionService.getInspectionList(req.query);
                res.json(inspectionList);
            }
            catch (error) {
                next(error);
            }
        });
    },
    getInspectionByTankNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tankNumber } = req.params;
                const report = yield services_1.inspectionService.getInspectionByTankNumber({
                    tankNumber,
                });
                res.json(report);
            }
            catch (error) {
                next(error);
            }
        });
    },
    createInspection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inspection = yield services_1.inspectionService.createInspection(req.body);
                res.status(201).json(inspection);
            }
            catch (error) {
                next(error);
            }
        });
    },
};
