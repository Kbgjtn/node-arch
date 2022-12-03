"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesV1 = void 0;
const users = "users";
const authentication = "oauth";
const V1 = "v1";
exports.routesV1 = {
    version: V1,
    user: {
        root: users,
    },
    authentication: {
        root: authentication,
    },
};
