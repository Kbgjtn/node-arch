export const mongoDBOption = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAliveInitialDelay: 5000,
	ignoreUndefined: false,
	loggerLevel: "info",
	keepAlive: false,
	rejectUnauthorized: true,
	retryReads: true,
	directConnection: false,
} as const;
