import { Application } from "express";
import { cors } from "../middlewares";

const setup = (app: Application) => {
    app.use(cors);
};

export default setup;
