import { Contact } from "../../../../src/domain/entities/contact";
import { ContactRepository } from "../../../../src/domain/interfaces/repositories/contact-repository";
import { CreateContact } from "../../../../src/domain/use-cases/contact/create-contact";

describe("Create Contact Use Case", () => {
    class MockContactRepository implements ContactRepository {
        createContact(contact: Contact): Promise<boolean> {
            throw new Error("Method not implemented.");
        }

        getContacts(): Promise<Contact[]> {
            throw new Error("Method not implemented.");
        }
    }

    let mockContactRepository = new MockContactRepository();

    beforeEach(() => {
        jest.clearAllMocks();

        mockContactRepository = new MockContactRepository();
    });

    test("Should return true", async () => {
        const inputData = {
            id: "1",
            surname: "Smith",
            firstName: "John",
            email: "john@gmail.com",
        };

        jest.spyOn(mockContactRepository, "createContact").mockImplementation(
            () => Promise.resolve(true)
        );

        const createContactUseCase = new CreateContact(mockContactRepository);
        const result = await createContactUseCase.execute(inputData);
        expect(result).toBe(true);
    });
});
