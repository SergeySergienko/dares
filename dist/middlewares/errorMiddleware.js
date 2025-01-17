"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof api_error_1.ApiError) {
        res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    else {
        res.status(500).json({
            message: `${err instanceof Error ? err.message : 'Unexpected error'}`,
        });
    }
};
exports.errorMiddleware = errorMiddleware;
