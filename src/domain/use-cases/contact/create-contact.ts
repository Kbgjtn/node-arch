import { ContactRepository } from "@/domain/interfaces/repositories/contact-repository";
import { CreateContactUseCase } from "@/domain/interfaces/use-cases/contact/create-contact-use-case";
import { ContactRequestModel } from "@/domain/models/contact";

export class CreateContact implements CreateContactUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(contact: ContactRequestModel): Promise<void> {
		return await this.contactRepository.createContact(contact);
	}
}
