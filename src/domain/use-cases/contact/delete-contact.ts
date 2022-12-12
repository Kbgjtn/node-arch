import { ContactRepository } from "@domain/interfaces/repositories/contact-repository";
import { DeleteContactUseCase } from "@domain/interfaces/use-cases/contact/delete-contact-use-case";

export class DeleteContact implements DeleteContactUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(id: string): Promise<void> {
		return await this.contactRepository.deleteContact(id);
	}
}
