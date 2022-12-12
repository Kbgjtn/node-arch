import {
	ContactRequestModel,
	ContactResponseModel,
} from "@/domain/models/contact";

export interface ContactRepository {
	createContact(contact: ContactRequestModel): Promise<void>;
	deleteContact(id: string): Promise<void>;
	updateContact(id: string, data: ContactRequestModel): Promise<void>;
	getContacts(): Promise<ContactResponseModel[]>;
	getContact(id: string): Promise<ContactResponseModel | null>;
}
