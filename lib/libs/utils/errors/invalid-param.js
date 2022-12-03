"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = void 0;
class InvalidParamError extends Error {
    constructor(_name) {
        super(`Invalid paramater: ${_name}`);
        this.name = "InvalidParamError";
    }
}
exports.InvalidParamError = InvalidParamError;
