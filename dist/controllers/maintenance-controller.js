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
exports.maintenanceController = void 0;
const services_1 = require("../services");
exports.maintenanceController = {
    getMaintenanceList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const maintenanceList = yield services_1.maintenanceService.getMaintenanceList(req.query);
                res.json(maintenanceList);
            }
            catch (error) {
                next(error);
            }
        });
    },
    createMaintenance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const maintenance = yield services_1.maintenanceService.createMaintenance(req.body);
                res.status(201).json(maintenance);
            }
            catch (error) {
                next(error);
            }
        });
    },
};
