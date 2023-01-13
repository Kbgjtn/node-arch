import { Db, MongoClient, MongoClientOptions, ObjectId } from "mongodb";
import { environment } from "../../../application/configuration/environment";

/**
 * Create a new connection to mongoDB from a function.
 * The supplied function receives an object containing
 * all method which database is using according to entities
 * You need to give name, collection, and size of pool DB
 *
 * @param dbName database name
 * @param collectionName collection name
 * @param options an object can provide multiple params refer to MongoClientOptions db configuration
 *
 * @example
 * ```
 * we have to create new connection for contacts data
 * source so we just call this function, then provide
 * the args as we need for contact data source
 *
 * const contactDataSource = connectMongoDataSource<T>({dbName: "contacts", collectionName: "contacts", options: { ...config }})
 * const quoteDataSource = connectMongoDataSource<T>({dbName: "quotes", collectionName: "quotes", options: { ...config }})
 * ```
 *
 * TODO: Can we create one function for handle all connection of Mongo Data Source?
 */
export async function connectMongoDataSource<T>({
	dbName,
	collectionName,
	options,
}: HandleMongoDataSourceArgs): Promise<T> {
	const client = new MongoClient(
		environment.db.mongoConnectURIString,
		options as MongoClientOptions
	) as MongoClient;

	try {
		await client.connect();
	} catch (error) {
		console.log(error);
	}

	const db = client.db(dbName) as Db;

	return <T>{
		find: async (query: object): Promise<any[]> => {
			return await db.collection(collectionName).find(query).toArray();
		},
		insertOne: async (doc: object): Promise<void> => {
			await db.collection(collectionName).insertOne(doc);
		},
		deleteOne: async (id: string): Promise<void> => {
			await db
				.collection(collectionName)
				.deleteOne({ _id: new ObjectId(id) });
		},
		updateOne: async (id: string, data: object): Promise<void> => {
			await db
				.collection(collectionName)
				.updateOne(
					{ _id: new ObjectId(id) },
					{ $set: { name: "name" in data ? data.name : null } }
				);
		},
		insertMany: async (doc: object[]): Promise<void> => {
			await db.collection(collectionName).insertMany(doc);
		},
	};
}

type HandleMongoDataSourceArgs = {
	dbName: string;
	collectionName: string;
	options?: IMongoClientOptionCustom;
};

type LoggerInfo = {
	loggerInfo?: string;
};

export interface IMongoClientOptionCustom
	extends MongoClientOptions,
		LoggerInfo {
	maxPoolSize?: number;
	useNewUrlParser?: boolean;
	useUnifiedTopology?: boolean;
	keepAliveInitialDelay?: number;
	ignoreUndefined?: boolean;
	keepAlive?: boolean;
	rejectUnauthorized?: boolean;
	retryReads?: boolean;
	directConnection?: boolean;
}
