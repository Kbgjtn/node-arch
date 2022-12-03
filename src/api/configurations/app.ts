import express from "express";
import setup from "./setup";

export const newApp = async () => {
    const app = express();
    setup(app);

    return app;
};
