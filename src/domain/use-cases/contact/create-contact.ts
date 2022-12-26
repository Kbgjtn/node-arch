import { ContactRequestModel } from "@/domain/models/contact";
import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { CreateContactUseCase } from "../../interfaces/use-cases/contact/create-contact-use-case";

export class CreateContact implements CreateContactUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(contact: ContactRequestModel): Promise<void> {
		return await this.contactRepository.createContact(contact);
	}
}
