import {
	ContactResponseModel,
	ContactRequestModel,
} from "@domain/models/contact";

export interface ContactRepository {
	createContact(contact: ContactRequestModel): Promise<void>;
	deleteContact(id: String): Promise<void>;
	updateContact(id: String, data: ContactRequestModel): Promise<void>;
	getContacts(): Promise<ContactResponseModel[]>;
	getContact(id: String): Promise<ContactResponseModel | null>;
}
