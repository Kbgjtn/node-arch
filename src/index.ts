import { server, ENVIRONMENT } from "./application/configurations";
import { ListCollectionsCursor, MongoClient } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/nosql-database-wrapper";
import { MongoDBContactDataSource } from "./data/data-sources/mongo-db/mongodb-contact-data-source";
import ContactsRouter from "./presentation/routers/contact-router";
import { GetAllContacts } from "./domain/use-cases/contact/get-all-contacts";
import { ContactRepositoryImpl } from "./domain/repositories/contact-repository";
import { CreateContact } from "./domain/use-cases/contact/create-contact";

async function listDatabases(client: MongoClient) {
	const databasesList = await client.db().admin().listDatabases();
	console.log("Databases: ");
	// databasesList.databases.forEach((db: any) => {
	// 	if (db) {
	// 		console.log("- " + db.name);
	// 	}
	// });
}

async function getMongoDataSource(): Promise<any> {
	const client: MongoClient = new MongoClient(
		ENVIRONMENT.DB.MONGO_CONNECT_URI_STR,
		{
			keepAliveInitialDelay: 5000,
			ignoreUndefined: false,
			loggerLevel: "info",
			keepAlive: false,
			rejectUnauthorized: true,
			retryReads: true,
			directConnection: false,
		}
	);

	try {
		client.on("serverOpening", () =>
			console.log("[ MongoDB Client is connected! ]")
		);

		const connectMongo = await client.connect();
		// const listdb = await listDatabases(client);

		connectMongo.on("error", (error) => {
			console.log(error);
		});

		const db = connectMongo.db("contacts");

		const contactDatabase: NoSQLDatabaseWrapper = {
			find: async (query) => {
				return await db.collection("contacts").find(query).toArray();
			},
			insertOne: async (doc) => {
				await db.collection("contacts").insertOne(doc);
			},
			deleteOne: async (id: String) => {
				await db.collection("contacts").deleteOne({ _id: id });
			},
			updateOne: async (id: String, data: object) => {
				await db.collection("contacts").updateOne({ _id: id }, data);
			},
		};

		return new MongoDBContactDataSource(contactDatabase);
	} catch (error) {
		if (error) {
			console.log(error);
			return;
		}
	}
}

const start = async () => {
	// this would be database connection
	const dataSource = await getMongoDataSource().catch(console.error);
	const contactMiddleware = ContactsRouter(
		new GetAllContacts(new ContactRepositoryImpl(dataSource)),
		new CreateContact(new ContactRepositoryImpl(dataSource))
	);

	const app = await server();
	app.use("/contact", contactMiddleware);

	app.listen(ENVIRONMENT.API.PORT, () =>
		console.log(
			`[ App is running on port ${ENVIRONMENT.API.PORT} | ${ENVIRONMENT.API.HOST}:${ENVIRONMENT.API.PORT} ]`
		)
	);

	process
		.on("SIGTERM", () => {
			console.log("SIGTERM signal received.");
			console.log("PID PROCESS: " + process.pid);
			console.log("Express app closed.");
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
};

start();
