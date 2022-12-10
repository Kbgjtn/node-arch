import { ContactResponseModel } from "@domain/models/contact";

export interface GetOneContactUseCase {
	execute(id: String): Promise<ContactResponseModel | null>;
}
