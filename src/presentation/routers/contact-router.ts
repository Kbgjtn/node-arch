import { Request, Response, Router } from "express";
import { CreateContactUseCase } from "../../domain/interfaces/use-cases/contact/create-contact-use-case";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/contact/get-all-contacts-use-case";

export default function ContactsRouter(
	getAllContactsUseCase: GetAllContactsUseCase,
	createContactUseCase: CreateContactUseCase
) {
	const router = Router();

	router.route("/").get(async (req: Request, res: Response) => {
		try {
			const contacts = await getAllContactsUseCase.execute();
			console.log("Hit Endopoint: 'contact/' :GET");
			res.send(contacts);
		} catch (error) {
			res.status(500).send({ message: "Error fetching data" });
		}
	});

	router.route("/").post(async (req: Request, res: Response) => {
		try {
			console.log("Hit Endopoint: 'contact/' :POST");
			await createContactUseCase.execute(req.body);
			res.status(201).json({ message: "Created" });
		} catch (error: any) {
			if (error) {
				console.log({ message: error.message });
			}
			res.status(500).send({ message: "Error saving data" });
		}
	});

	return router;
}
