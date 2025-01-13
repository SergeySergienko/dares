"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.partsRouter = (0, express_1.Router)();
exports.partsRouter.get('/', controllers_1.partsController.getParts);
