import { ContactRequestModel } from "@domain/models/contact";

export interface UpdateContactUseCase {
	execute(id: String, data: ContactRequestModel): Promise<void>;
}
