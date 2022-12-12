import {
	ContactRequestModel,
	ContactResponseModel,
} from "@domain/models/contact";

export interface ContactDataSource {
	create(contact: ContactRequestModel): Promise<void>;
	getAll(): Promise<ContactResponseModel[]>;
	deleteOne(id: string): Promise<void>;
	updateOne(id: string, data: ContactRequestModel): Promise<void>;
	getOne(id: string): Promise<ContactResponseModel | null>;
}

export interface GetContactMongoDataSource {
	DB_NAME: string;
	COLLECTION: string;
}
