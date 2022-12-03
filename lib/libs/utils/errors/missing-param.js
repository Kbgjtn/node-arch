"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
class MissingParamError extends Error {
    constructor(_name) {
        super(`Missing paramater: ${_name}`);
        this.name = "MissingParamError";
    }
}
exports.MissingParamError = MissingParamError;
