import {
	ContactRequestModel,
	ContactResponseModel,
} from "@domain/models/contact";

export interface ContactDataSource {
	create(contact: ContactRequestModel): Promise<void>;
	getAll(): Promise<ContactResponseModel[]>;
	deleteOne(id: String): Promise<void>;
	updateOne(id: String, data: ContactRequestModel): Promise<void>;
	getOne(id: String): Promise<ContactResponseModel | null>;
}
