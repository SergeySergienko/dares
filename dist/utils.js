"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGrade = exports.tankModelMapper = exports.maintenanceModelMapper = exports.inspectionModelMapper = void 0;
const inspectionModelMapper = (inspection) => {
    const { _id, tankId } = inspection, rest = __rest(inspection, ["_id", "tankId"]);
    return Object.assign({ id: _id.toString(), tankId: tankId.toString() }, rest);
};
exports.inspectionModelMapper = inspectionModelMapper;
const maintenanceModelMapper = (maintenance) => {
    const { _id, tankId } = maintenance, rest = __rest(maintenance, ["_id", "tankId"]);
    return Object.assign({ id: _id.toString(), tankId: tankId.toString() }, rest);
};
exports.maintenanceModelMapper = maintenanceModelMapper;
const tankModelMapper = (tank) => {
    const { _id } = tank, rest = __rest(tank, ["_id"]);
    return Object.assign({ id: _id.toString() }, rest);
};
exports.tankModelMapper = tankModelMapper;
const isValidGrade = (value) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value);
};
exports.isValidGrade = isValidGrade;
