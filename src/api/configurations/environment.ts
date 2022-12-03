import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

export const ENVIRONMENT = {
    API: {
        PORT: Number(process.env.PORT),
    },
};
