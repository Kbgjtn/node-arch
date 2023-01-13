import { MongoDBContactDataSource } from "../../data/data-sources/mongo-db/mongodb-contact-data-source";
import { NoSQLDatabaseWrapper } from "../../data/interfaces/data-sources/nosql-database-wrapper";
import { ContactRepositoryImpl } from "../../domain/repositories/contact-repository";
import { CreateContact } from "../../domain/use-cases/contact/create-contact";
import { DeleteContact } from "../../domain/use-cases/contact/delete-contact";
import { GetAllContacts } from "../../domain/use-cases/contact/get-all-contacts";
import { GetOneContact } from "../../domain/use-cases/contact/get-one-contact";
import { UpdateContact } from "../../domain/use-cases/contact/update-contact";
import { ContactsRouter } from "../routers/contact-router";

/**
 * Used to determine all the can process request objects
 * multiple times before the server works for that request.
 */
export const contactMiddleware = ({
	contactDataSource,
}: HandlerContactMiddleware) => {
	return ContactsRouter({
		getOneContactUseCase: new GetOneContact(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDataSource)
			)
		),
		getAllContactsUseCase: new GetAllContacts(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDataSource)
			)
		),
		createContactUseCase: new CreateContact(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDataSource)
			)
		),
		updateContactUseCase: new UpdateContact(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDataSource)
			)
		),
		deleteContactUseCase: new DeleteContact(
			new ContactRepositoryImpl(
				new MongoDBContactDataSource(contactDataSource)
			)
		),
	});
};

type HandlerContactMiddleware = {
	/** The DataSource of Contact  */ contactDataSource: NoSQLDatabaseWrapper;
};
