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
exports.tanksService = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
exports.tanksService = {
    getTanks(queryObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const tanks = yield repositories_1.tanksRepo.getTanks(queryObject);
            if (!tanks) {
                throw api_error_1.ApiError.ServerError('Failed to fetch tank records.');
            }
            return tanks.map(utils_1.tankModelMapper);
        });
    },
    updateTank(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTank = yield repositories_1.tanksRepo.updateTank(updateData);
            if (!updatedTank) {
                throw api_error_1.ApiError.NotFound(`Tank with id: ${updateData.id} wasn't found`);
            }
            return (0, utils_1.tankModelMapper)(updatedTank);
        });
    },
};
