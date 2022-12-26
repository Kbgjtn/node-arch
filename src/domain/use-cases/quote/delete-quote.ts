import { QuoteRepository } from "@/domain/interfaces/repositories/quote-repository";
import { DeleteQuoteUseCase } from "@/domain/interfaces/use-cases/quote/delete-quote-use-case";

export class DeleteQuote implements DeleteQuoteUseCase {
	quoteRepository: QuoteRepository;

	constructor(quoteRepository: QuoteRepository) {
		this.quoteRepository = quoteRepository;
	}

	async execute(id: string): Promise<void> {
		return await this.quoteRepository.deleteQuote(id);
	}
}
