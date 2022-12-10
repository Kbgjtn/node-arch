import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });

export const ENVIRONMENT = {
	API: {
		PORT: Number(process.env.PORT),
		HOST: "http://localhost",
	},
};
