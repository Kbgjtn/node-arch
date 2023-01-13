import { CreateContactUseCase } from "@/domain/interfaces/use-cases/contact/create-contact-use-case";
import { DeleteContactUseCase } from "@/domain/interfaces/use-cases/contact/delete-contact-use-case";
import { GetAllContactsUseCase } from "@/domain/interfaces/use-cases/contact/get-all-contacts-use-case";
import { GetOneContactUseCase } from "@/domain/interfaces/use-cases/contact/get-one-contact-use-case";
import { UpdateContactUseCase } from "@/domain/interfaces/use-cases/contact/update-contact-use-case";
import { NextFunction, Request, Response, Router } from "express";
import { InvalidRequestPayloadError } from "../../utils/errors";
import { capitalize } from "../../utils/helpers";
import { createOneContactSchema } from "../../validation/create-one-contact";
/**
 * Creates a failable comutation from a function.
 * The supplied function receives an object containing
 * helper functions to create IFailable values. You
 * need to give generic arguments T and E to it indicating
 * the success and failure types.
 *
 * @param f Failable computation
 *
 * @example
 * ```
 * const computation1: () => Failable<string, string> = ...;
 * const computation2: (x: string) => Failable<number, string> = ...;
 * const computation3 = failable<number, string>(({ run, success, failure }) => {
 *   const str = run(computation1());
 *   const num = run(computation2(str));
 *   if (num > 10) {
 *     return success(num);
 *   } else {
 *     return failure("Number too small");
 *   }
 * })
 * ```
 */
export function ContactsRouter({
  getOneContactUseCase,
  getAllContactsUseCase,
  createContactUseCase,
  updateContactUseCase,
  deleteContactUseCase,
}: HandlerContactRouterArgs) {
  const router = Router();

  router
    .route("/:id")
    .get(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      console.log("Hit Endopoint: 'contacts/:id' :GET");
      try {
        const contact = await getOneContactUseCase.execute(id);
        res.status(200).json({
          code: "200",
          status: "OK",
          timestamp: Date.now(),
          data: contact || {},
        });
      } catch (error: any) {
        if (error) {
          console.log(error);

          if (
            error.message ===
            "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
          ) {
            res.status(400).json({
              code: "400",
              status: "Bad Request",
              timestamp: Date.now(),
              errors: {
                title: "ErrorInvalidID",
                details: "params is not valid or not found",
              },
            });

            return next();
          }
        }

        res.status(500).json({ errors: {} });
      }
    });

  router.route("/").get(async (_req: Request, res: Response) => {
    console.log("Hit Endopoint: 'contacts/' :GET");
    try {
      const contacts = await getAllContactsUseCase.execute();
      res.status(200).json({
        code: "200",
        status: "OK",
        timestamp: Date.now(),
        data: { contacts: contacts || [], length: contacts.length },
      });
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
        await createOneContactSchema.validateAsync({
          name: req.body.name,
        });

        await createContactUseCase.execute({
          name: capitalize(req.body.name),
        });

        res.status(201).json({
          status: "Created",
          code: "201",
          timestamp: Date.now(),
          message: "Contact created successfully",
        });
      } catch (error: any) {
        if (error) {
          console.log(error);

          if (error.isJoi) {
            res.status(400).json({
              code: "400",
              status: "Bad Request",
              timestamp: Date.now(),
              errors: {
                title: error.name,
                desc: error.message,
                details: error.details,
              },
            });

            next(new InvalidRequestPayloadError(error._original.name));

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
              code: "400",
              status: "Bad Request",
              timestamp: Date.now(),
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

type HandlerContactRouterArgs = {
  getOneContactUseCase: GetOneContactUseCase;
  getAllContactsUseCase: GetAllContactsUseCase;
  createContactUseCase: CreateContactUseCase;
  updateContactUseCase: UpdateContactUseCase;
  deleteContactUseCase: DeleteContactUseCase;
};
