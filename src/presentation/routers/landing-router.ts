import { Request, Response, Router } from "express";
const route = Router();

export default function LandingPageRouter(router: Router) {
	router.use("/", route);

	route.get("/checkhealth", async (req: Request, res: Response) => {
		try {
			res.status(200).json({
				status: "OK",
				code: "200",
				message: "I’m okay! 😁😁😁",
				uptime: process.uptime(),
				timestamp: Date.now(),
				response_time: process.hrtime()[1],
				links: {
					self: `${req.protocol}://${req.get("host")}${
						req.originalUrl
					}`,
				},
			});
		} catch (error) {
			if (error) {
				res.status(500).json({
					message: "Error: " + error,
				});
			}
		}
	});
}
