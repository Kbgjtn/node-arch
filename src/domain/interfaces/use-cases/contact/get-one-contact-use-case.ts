import { ContactResponseModel } from "@/domain/models/contact";

export interface GetOneContactUseCase {
	execute(id: string): Promise<ContactResponseModel | null>;
}
