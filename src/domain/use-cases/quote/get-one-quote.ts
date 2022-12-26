import { QuoteRepository } from "@/domain/interfaces/repositories/quote-repository";
import { GetOneQuoteUseCase } from "@/domain/interfaces/use-cases/quote/get-one-quote-use-case";
import { QuoteResponseModel } from "@/domain/models/quote";

export class GetOneQuote implements GetOneQuoteUseCase {
	quoteRepository: QuoteRepository;

	constructor(quoteRepository: QuoteRepository) {
		this.quoteRepository = quoteRepository;
	}

	async execute(id: string): Promise<QuoteResponseModel | null> {
		const result = await this.quoteRepository.getQuote(id);
		return result;
	}
}
