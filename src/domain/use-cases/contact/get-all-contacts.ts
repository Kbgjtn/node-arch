import { ContactResponseModel } from "@/domain/models/contact";
import { ContactRepository } from "@/domain/interfaces/repositories/contact-repository";
import { GetAllContactsUseCase } from "@/domain/interfaces/use-cases/contact/get-all-contacts-use-case";

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
