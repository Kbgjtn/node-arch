export interface NoSQLDatabaseWrapper {
	find(query: object): Promise<any[]>;
	insertOne(doc: any): Promise<void>;
	insertMany(docs: any[]): Promise<void>;
	deleteOne(id: string): Promise<void>;
	updateOne(id: string, data: object): Promise<void>;
}
