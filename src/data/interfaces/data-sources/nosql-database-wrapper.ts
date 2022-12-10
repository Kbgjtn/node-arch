export interface NoSQLDatabaseWrapper {
	find(query: object): Promise<any[]>;
	insertOne(doc: any): Promise<void>;
	deleteOne(id: String): Promise<void>;
	updateOne(id: String, data: object): Promise<void>;
}
