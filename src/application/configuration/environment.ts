import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });

export const environment = {
	api: {
		port: Number(process.env.PORT),
		host: "http://localhost",
	},
	db: {
		mongoConnectURIString: process.env.MONGODB_CONNECT_URI_STR as string,
	},
};
