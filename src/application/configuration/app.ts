import express from "express";
import setup from "./setup";

export const expressServer = async () => {
	const app = express();
	setup(app);

	return app;
};
