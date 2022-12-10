import { ContactResponseModel } from "@domain/models/contact";
import { Contact } from "../../entities/contact";
import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { GetAllContactsUseCase } from "../../interfaces/use-cases/contact/get-all-contacts-use-case";

export class GetAllContacts implements GetAllContactsUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(): Promise<ContactResponseModel[]> {
		const result = await this.contactRepository.getContacts();
		return result;
	}
}
