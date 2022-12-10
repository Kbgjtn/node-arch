import { Application } from "express";
import { cors } from "../middlewares";
import router from "../../presentation/routers";

const setup = (app: Application) => {
	app.use(cors);
	app.use(router);
};

export default setup;
