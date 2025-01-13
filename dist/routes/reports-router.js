"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.reportsRouter = (0, express_1.Router)();
exports.reportsRouter.get('/', controllers_1.reportsController.generatePartUsageReport);
