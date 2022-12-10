import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });

export const ENVIRONMENT = {
	API: {
		PORT: Number(process.env.PORT),
		HOST: "http://localhost",
	},
	DB: {
		MONGO_CONNECT_URI_STR: process.env.MONGODB_CONNECT_URI_STR as string,
	},
};
