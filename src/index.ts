import { environment, server } from "./application/configurations";
import { contactMiddleware } from "./application/middlewares/contact-middleware";
import { mongoDBOption } from "./libs/utils/helpers/constants/mongo-options";
import { connectMongoDataSource } from "./presentation/db/connection/mongo-client";

/* 
async function listDatabases(client: MongoClient) {
	const databasesList = await client.db().admin().listDatabases();
	console.log("Databases: ");
	databasesList.databases.forEach((db: any) => {
		if (db) {
			console.log("- " + db.name);
		}
	});
}
*/

const pool = process.argv.length >= 3 ? parseInt(process.argv[2]) : 1;

const start = async () => {
	// run server
	const app = await server();

	app.use(
		"/v1/contacts",
		contactMiddleware({
			contactDataSource: await connectMongoDataSource({
				dbName: "contacts",
				collectionName: "contacts",
				options: { ...(mongoDBOption as object), maxPoolSize: pool },
			}),
		})
	);

	app.listen(environment.api.port, () =>
		console.log(
			`[ App is running on pid: ${process.pid} | ${environment.api.host}:${environment.api.port} ]`
		)
	);
};

start();

process
	.on("SIGTERM", () => {
		console.log("SIGTERM signal received.");
		console.log("PID PROCESS: " + process.pid);
		console.log("SIGTERM signal received: closing HTTP server");
		process.exit(0);
	})
	.on("SIGINT", () => {
		console.log("Server is shut down!");
		process.exit(0);
	})
	.on("unhandledRejection", (error) => {
		console.log(`unhandledRejaction captured: ${error}`);
		process.exit(0);
	})
	.on("uncaughtException", (error) => {
		console.log(`uncaughtException captured: ${error}`);
		process.exit(0);
	});
