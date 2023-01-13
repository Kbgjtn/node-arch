export const cors = (_req: any, res: any, next: any) => {
	res.setHeader("access-control-allow-origin", "*");
	res.setHeader("access-control-allow-methods", "*");
	res.setHeader("access-control-allow-headers", "*");

	next();
};
