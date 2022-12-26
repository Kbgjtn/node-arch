import { QuoteRepository } from "@/domain/interfaces/repositories/quote-repository";
import { CreateQuoteUseCase } from "@/domain/interfaces/use-cases/quote/create-quote-use-case";
import { QuoteRequestModel } from "@/domain/models/quote";

export class CreateQuote implements CreateQuoteUseCase {
	quoteRepository: QuoteRepository;

	async execute(quote: QuoteRequestModel): Promise<void> {
		return await this.quoteRepository.createQuote(quote);
	}
}
