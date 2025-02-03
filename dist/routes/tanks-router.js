"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tanksRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.tanksRouter = (0, express_1.Router)();
exports.tanksRouter.get('/', controllers_1.tanksController.getTanks);
exports.tanksRouter.put('/', controllers_1.tanksController.updateTank);
