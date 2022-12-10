import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { Contact } from "../../../domain/entities/contact";
import { NoSQLDatabaseWrapper } from "@/data/interfaces/data-sources/nosql-database-wrapper";
import {
	ContactRequestModel,
	ContactResponseModel,
} from "@domain/models/contact";

export class MongoDBContactDataSource implements ContactDataSource {
	private database: NoSQLDatabaseWrapper;

	constructor(database: NoSQLDatabaseWrapper) {
		this.database = database;
	}

	async deleteOne(id: String): Promise<void> {
		await this.database.deleteOne(id);
	}

	async updateOne(id: String, data: ContactRequestModel): Promise<void> {
		await this.database.updateOne(id, data);
	}

	async getOne(id: String): Promise<ContactResponseModel | null> {
		const result = await this.database.find({ id: id });
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
