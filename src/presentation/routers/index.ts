import { Router } from "express";
import LandingPageRouter from "./landing-router";

const router = Router();

LandingPageRouter(router);

export default router;
