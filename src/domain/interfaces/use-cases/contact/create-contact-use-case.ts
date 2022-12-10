import { ContactRequestModel } from "@domain/models/contact";

export interface CreateContactUseCase {
	execute(contact: ContactRequestModel): Promise<void>;
}
