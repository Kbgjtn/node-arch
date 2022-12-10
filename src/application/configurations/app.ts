import express from "express";
import setup from "./setup";

export const server = async () => {
	const app = express();

	setup(app);

	return app;
};
