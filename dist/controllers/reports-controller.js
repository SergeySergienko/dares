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
exports.reportsController = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
exports.reportsController = {
    generatePartUsageReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { alias, tankId, startDate, endDate } = req.query;
                const pipeline = [{ $match: {} }];
                if (tankId) {
                    pipeline[0].$match.tankId = mongodb_1.ObjectId.createFromHexString(tankId);
                }
                if (alias) {
                    pipeline.push({ $match: { [`parts.${alias}`]: { $exists: true } } });
                }
                if (startDate || endDate) {
                    const dateFilter = {};
                    if (startDate) {
                        dateFilter.$gte = new Date(startDate);
                    }
                    if (endDate) {
                        dateFilter.$lte = new Date(endDate);
                    }
                    pipeline[0].$match.date = dateFilter;
                }
                pipeline.push({
                    $group: {
                        _id: null,
                        total: { $sum: `$parts.${alias}` },
                    },
                }, {
                    $project: {
                        total: 1,
                        _id: 0,
                    },
                });
                const [report] = yield db_1.maintenanceCollection
                    .aggregate(pipeline)
                    .toArray();
                res.json(report || { total: 0 });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
