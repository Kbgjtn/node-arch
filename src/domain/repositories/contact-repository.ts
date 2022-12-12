import { ContactDataSource } from "@/data/interfaces/data-sources/contact-data-source";
import { ContactRepository } from "../interfaces/repositories/contact-repository";
import { ContactRequestModel, ContactResponseModel } from "../models/contact";

export class ContactRepositoryImpl implements ContactRepository {
	contactDataSource: ContactDataSource;

	constructor(contactDataSource: ContactDataSource) {
		this.contactDataSource = contactDataSource;
	}

	async deleteContact(id: string): Promise<void> {
		await this.contactDataSource.deleteOne(id);
	}

	async updateContact(id: string, data: ContactRequestModel): Promise<void> {
		await this.contactDataSource.updateOne(id, data);
	}

	async getContact(id: string): Promise<ContactResponseModel | null> {
		const result = await this.contactDataSource.getOne(id);
		return result;
	}

	async createContact(contact: ContactRequestModel): Promise<void> {
		await this.contactDataSource.create(contact);
	}

	async getContacts(): Promise<ContactResponseModel[]> {
		const result = await this.contactDataSource.getAll();
		return result;
	}
}
