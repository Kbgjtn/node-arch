import request from "supertest";
import { Contact } from "../../../src/domain/entities/contact";
import { CreateContactUseCase } from "../../../src/domain/interfaces/use-cases/contact/create-contact";
import { GetAllContactsUseCase } from "../../../src/domain/interfaces/use-cases/contact/get-all-contacts";
import ContactRouter from "../../../src/presentation/routers/contact-router";
import server from "../../../src/server";

class MockGetAllContacsUseCase implements GetAllContactsUseCase {
    execute(): Promise<Contact[]> {
        throw new Error("Method not implemented.");
    }
}

class MockCreateContactUseCase implements CreateContactUseCase {
    execute(): Promise<boolean> {
        throw new Error("Method not implemented");
    }
}

describe("Contact Router", () => {
    let mockCreateContactUseCase: CreateContactUseCase;
    let mockGetAllContacsUseCase: GetAllContactsUseCase;

    beforeAll(() => {
        mockGetAllContacsUseCase = new MockGetAllContacsUseCase();
        mockCreateContactUseCase = new MockCreateContactUseCase();

        server.use(
            "/contact",
            ContactRouter(mockGetAllContacsUseCase, mockCreateContactUseCase)
        );
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /contact", () => {
        test("Should return 200 with data", async () => {
            const expectedData = [
                {
                    id: "1",
                    surname: "Smith",
                    firstName: "John",
                    email: "john@mail.com",
                },
            ];

            jest.spyOn(mockGetAllContacsUseCase, "execute").mockImplementation(
                () => Promise.resolve(expectedData)
            );
            const response = await request(server).get("/contact");

            expect(response.status).toBe(200);
            expect(mockGetAllContacsUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(expectedData);
        });

        test("GET /contact returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllContacsUseCase, "execute").mockImplementation(
                () => Promise.reject(Error())
            );

            const response = await request(server).get("/contact");
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({
                message: "Error fetching data",
            });
        });
    });

    describe("POST /contact", () => {
        test("POST /contact", async () => {
            const inputData = {
                id: "1",
                surname: "Smith",
                firstName: "John",
                email: "john@mail.com",
            };

            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(
                () => Promise.resolve(true)
            );

            const response = await request(server)
                .post("/contact")
                .send(inputData);

            expect(response.status).toBe(201);
        });

        test("POST /contact returns 500 on use case error", async () => {
            const inputData = {
                id: "1",
                surname: "Smith",
                firstName: "John",
                email: "john@mail.com",
            };

            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(
                () => Promise.reject(Error())
            );

            const response = await request(server)
                .post("/contact")
                .send(inputData);

            expect(response.status).toBe(500);
        });
    });
});
