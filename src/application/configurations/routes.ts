/**
 * Application router endpoints
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// root paths uri
const users = "users";
const authentication = "oauth";

// Api versions
const V1 = "v1";

export const routesV1 = {
    version: V1,
    user: {
        root: users as string,
        // ... params or query
    },
    authentication: {
        root: authentication as string,
        // ... params or query
    },
};
