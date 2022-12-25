import { QuoteRepository } from "@/domain/interfaces/repositories/quote-repository";
import { UpdateQuoteUseCase } from "@/domain/interfaces/use-cases/quote/update-quote-use-case";
import { QuoteRequestModel } from "@/domain/models/quote";

export class UpdateQuote implements UpdateQuoteUseCase {
	quoteRepository: QuoteRepository;

	constructor(quoteRepository: QuoteRepository) {
		this.quoteRepository = quoteRepository;
	}

	async execute(id: string, data: QuoteRequestModel): Promise<void> {
		return await this.quoteRepository.updateQuote(id, data);
	}
}
