"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectionRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.inspectionRouter = (0, express_1.Router)();
exports.inspectionRouter.get('/', controllers_1.inspectionController.getInspectionList);
exports.inspectionRouter.post('/', controllers_1.inspectionController.createInspection);
