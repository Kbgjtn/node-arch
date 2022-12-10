import { ContactResponseModel } from "@domain/models/contact";
import { ContactRepository } from "@domain/interfaces/repositories/contact-repository";
import { GetOneContactUseCase } from "@domain/interfaces/use-cases/contact/get-one-contact-use-case";

export class GetOneContact implements GetOneContactUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(id: String): Promise<ContactResponseModel | null> {
		const result = await this.contactRepository.getContact(id);
		return result;
	}
}
