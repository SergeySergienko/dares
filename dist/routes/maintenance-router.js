"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.maintenanceRouter = (0, express_1.Router)();
exports.maintenanceRouter.get('/', controllers_1.maintenanceController.getMaintenanceList);
