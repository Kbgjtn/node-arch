import { config } from "dotenv";
import * as path from "path";

const environment: string = path.resolve(
    __dirname,
    process.env.NODE_ENV === "test"
        ? "../../../../.env.test"
        : "../../../../.env"
);

config({ path: environment });
