import { ContactRequestModel } from "@/domain/models/contact";

export interface NoSQLDatabaseWrapper {
	find(query: object): Promise<any[]>;
	insertOne(doc: any): Promise<void>;
	deleteOne(id: string): Promise<void>;
	updateOne(id: string, data: ContactRequestModel): Promise<void>;
}
