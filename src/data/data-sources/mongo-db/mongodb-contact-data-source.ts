import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { Contact } from "../../../domain/entities/contact";
import { NoSQLDatabaseWrapper } from "@/data/interfaces/data-sources/nosql-database-wrapper";
import {
	ContactRequestModel,
	ContactResponseModel,
} from "@domain/models/contact";
import { ObjectId } from "mongodb";

export class MongoDBContactDataSource implements ContactDataSource {
	private database: NoSQLDatabaseWrapper;

	constructor(database: NoSQLDatabaseWrapper) {
		this.database = database;
	}

	async deleteOne(id: string): Promise<void> {
		await this.database.deleteOne(id);
	}

	async updateOne(id: string, data: ContactRequestModel): Promise<void> {
		await this.database.updateOne(id, data);
	}

	async getOne(id: string): Promise<ContactResponseModel | null> {
		const result = await this.database.find({ _id: new ObjectId(id) });
		console.log({ result });

		return result.map((item) => ({
			id: item._id.toString(),
			name: item.name,
		}))[0];
	}

	async create(contact: ContactRequestModel): Promise<void> {
		await this.database.insertOne(contact);
	}

	async getAll(): Promise<ContactResponseModel[]> {
		const result = await this.database.find({});

		return result.map((item) => ({
			id: item._id.toString(),
			name: item.name,
		}));
	}
}
