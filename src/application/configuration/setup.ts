import bodyParser from "body-parser";
import { Application } from "express";
import router from "../../presentation/routers";
import { cors } from "../middlewares/cors";
import { header } from "./header";

const setup = (app: Application) => {
	app.use(cors);
	app.use(header);
	app.use(
		bodyParser.json({ limit: "100kb" }),
		bodyParser.urlencoded({
			extended: false,
			limit: "100kb",
		}),
		bodyParser.raw({
			type: "application/octet-stream",
			limit: "100kb",
		})
	);
	app.use(router);
};

export default setup;
