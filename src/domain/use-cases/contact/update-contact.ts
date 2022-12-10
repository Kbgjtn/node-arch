import { ContactRepository } from "@domain/interfaces/repositories/contact-repository";
import { UpdateContactUseCase } from "@domain/interfaces/use-cases/contact/update-contact-use-case";
import { ContactRequestModel } from "@domain/models/contact";

export class UpdateContact implements UpdateContactUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(id: String, data: ContactRequestModel): Promise<void> {
		return await this.contactRepository.updateContact(id, data);
	}
}
