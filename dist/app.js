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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = require("./config/db");
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app
    .use(express_1.default.static(path_1.default.join(__dirname, 'public')))
    .use((0, cors_1.default)())
    .use(express_1.default.json());
app
    .use('/api/inspection', routes_1.inspectionRouter)
    .use('/api/maintenance', routes_1.maintenanceRouter)
    .use('/api/parts', routes_1.partsRouter)
    .use('/api/reports', routes_1.reportsRouter)
    .use('/api/tanks', routes_1.tanksRouter);
app.use(middlewares_1.errorMiddleware);
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    return app;
});
exports.initializeApp = initializeApp;
