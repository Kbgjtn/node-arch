import { ContactRequestModel } from "@domain/models/contact";

export interface UpdateContactUseCase {
	execute(id: string, data: ContactRequestModel): Promise<void>;
}
