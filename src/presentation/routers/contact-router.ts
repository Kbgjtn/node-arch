import { createOneContactSchema } from "../../libs/utils/validator/contacts/create-one-contact";
import { NextFunction, Request, Response, Router } from "express";
import { capitalize } from "../../libs/utils/helpers/capitalize-first-Latter";
import { CreateContactUseCase } from "../../domain/interfaces/use-cases/contact/create-contact-use-case";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/contact/get-all-contacts-use-case";
import { InvalidRequestPayloadError } from "../../libs/utils/errors";
import { GetOneContactUseCase } from "../../domain/interfaces/use-cases/contact/get-one-contact-use-case";
import { UpdateContactUseCase } from "../../domain/interfaces/use-cases/contact/update-contact-use-case";
import { DeleteContactUseCase } from "../../domain/interfaces/use-cases/contact/delete-contact-use-case";

export default function ContactsRouter(
	getOneContactUseCase: GetOneContactUseCase,
	getAllContactsUseCase: GetAllContactsUseCase,
	createContactUseCase: CreateContactUseCase,
	updateContactUseCase: UpdateContactUseCase,
	deleteContactUseCase: DeleteContactUseCase
) {
	const router = Router();

	router.route("/:id").get(async (req: Request, res: Response) => {
		const { id } = req.params;
		console.log("Hit Endopoint: 'contacts/:id' :GET");

		const contact = await getOneContactUseCase.execute(id);
		res.status(200).json({ code: "200", status: "OK", contact });
	});

	router.route("/").get(async (_req: Request, res: Response) => {
		console.log("Hit Endopoint: 'contacts/' :GET");
		try {
			const contacts = await getAllContactsUseCase.execute();
			res.send(contacts);
		} catch (error) {
			if (error) {
				console.log({ error });
			}
			res.status(500).send({ message: "Error fetching data" });
		}
	});

	router
		.route("/")
		.post(async (req: Request, res: Response, next: NextFunction) => {
			console.log("Hit Endopoint: 'contacts/' :POST");
			try {
				const payload = await createOneContactSchema.validateAsync({
					name: req.body.name,
				});

				console.log({ payload });

				if (payload.error) {
					res.status(400).json({
						status: "Bad Request",
						code: "400",
						message: payload.error,
					});
					return;
				}

				await createContactUseCase.execute({
					name: capitalize(req.body.name),
				});

				res.status(201).json({ message: "Created" });
			} catch (error: any) {
				if (error) {
					console.log(error);

					if (error.isJoi) {
						res.status(400).json({
							code: "400",
							status: "Bad Request",

							errors: [
								{
									title: error.name,
									desc: error.message,
									details: error.details,
								},
							],
						});
						next(
							new InvalidRequestPayloadError(error._original.name)
						);
						return;
					}
				}

				res.status(500).send({
					message: "Error saving data",
				});
			}
		});

	router
		.route("/:id")
		.put(async (req: Request, res: Response, next: NextFunction) => {
			console.log("Hit Endopoint: 'contacts/:id' :PUT");
			try {
				const { id } = req.params;
				const { name } = req.body;

				await updateContactUseCase.execute(id, {
					name: capitalize(name),
				});
				res.sendStatus(204);
			} catch (error: any) {
				if (error) {
					console.log({
						message: error.message,
						stack: error.stack,
					});

					if (
						error.message ===
						"Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
					) {
						res.status(400).json({
							errors: {
								title: "ErrorInvalidID",
								details: "id is not valid or not found",
							},
						});

						return next();
					}
				}

				res.status(500).json({ message: "cannot update changes" });
				next();
			}
		});

	router
		.route("/:id")
		.delete(async (req: Request, res: Response, next: NextFunction) => {
			console.log("Hit Endopoint: 'contacts/:id' :DELETE");
			try {
				const { id } = req.params;

				await deleteContactUseCase.execute(id);
				res.sendStatus(204);
			} catch (error) {
				if (error) {
					console.log(error);
				}

				res.sendStatus(500);
				next();
			}
		});

	return router;
}
