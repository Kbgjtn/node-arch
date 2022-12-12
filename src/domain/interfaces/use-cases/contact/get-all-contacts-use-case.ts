import { ContactResponseModel } from "@/domain/models/contact"; 

export interface GetAllContactsUseCase {
	execute(): Promise<ContactResponseModel[]>;
}
