import { server, ENVIRONMENT } from "./application/configurations";
import { MongoClient, MongoClientOptions, ObjectId } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/nosql-database-wrapper";
import { MongoDBContactDataSource } from "./data/data-sources/mongo-db/mongodb-contact-data-source";
import ContactsRouter from "./presentation/routers/contact-router";
import { GetAllContacts } from "./domain/use-cases/contact/get-all-contacts";
import { ContactRepositoryImpl } from "./domain/repositories/contact-repository";
import { CreateContact } from "./domain/use-cases/contact/create-contact";
import { GetContactMongoDataSource } from "./data/interfaces/data-sources/contact-data-source";
import { GetOneContact } from "./domain/use-cases/contact/get-one-contact";
import { DeleteContact } from "./domain/use-cases/contact/delete-contact";
import { UpdateContact } from "./domain/use-cases/contact/update-contact";
import { ContactRequestModel } from "./domain/models/contact";

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

async function getMongoDataSource(
	params: GetContactMongoDataSource
): Promise<any> {
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		keepAliveInitialDelay: 5000,
		ignoreUndefined: false,
		loggerLevel: "info",
		keepAlive: false,
		rejectUnauthorized: true,
		retryReads: true,
		directConnection: false,
		maxPoolSize: pool,
	};

	const client: MongoClient = new MongoClient(
		ENVIRONMENT.DB.MONGO_CONNECT_URI_STR,
		options as MongoClientOptions
	);

	let contactDatabase: NoSQLDatabaseWrapper;

	try {
		await client.connect();
		// const listdb = await listDatabases(client);
		client.on("serverOpening", () => {
			console.log("[ MongoDB Client is connected! ]");
		});

		const db = client.db(params.DB_NAME);

		contactDatabase = {
			find: async (query) => {
				return await db
					.collection(params.COLLECTION)
					.find(query)
					.toArray();
			},
			insertOne: async (doc) => {
				await db.collection(params.COLLECTION).insertOne(doc);
			},
			deleteOne: async (id: string) => {
				await db
					.collection(params.COLLECTION)
					.deleteOne({ _id: new ObjectId(id) });
			},
			updateOne: async (id: string, data: ContactRequestModel) => {
				await db
					.collection(params.COLLECTION)
					.updateOne(
						{ _id: new ObjectId(id) },
						{ $set: { name: data.name } }
					);
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
	const contactDataSource = await getMongoDataSource({
		DB_NAME: "contacts",
		COLLECTION: "contacts",
	}).catch(console.error);
	// run server
	const app = await server();

	const contactMiddleware = ContactsRouter(
		new GetOneContact(new ContactRepositoryImpl(contactDataSource)),
		new GetAllContacts(new ContactRepositoryImpl(contactDataSource)),
		new CreateContact(new ContactRepositoryImpl(contactDataSource)),
		new UpdateContact(new ContactRepositoryImpl(contactDataSource)),
		new DeleteContact(new ContactRepositoryImpl(contactDataSource))
	);

	app.use("/v1/contacts", contactMiddleware);

	app.listen(ENVIRONMENT.API.PORT, () =>
		console.log(
			`[ App is running on pid: ${process.pid} | ${ENVIRONMENT.API.HOST}:${ENVIRONMENT.API.PORT} ]`
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
