import { QuoteRepository } from "@/domain/interfaces/repositories/quote-repository";
import { GetAllQuotesUseCase } from "@/domain/interfaces/use-cases/quote/get-all-quotes-use-case";
import { QuoteResponseModel } from "@/domain/models/quote";

export class GetAllQuotes implements GetAllQuotesUseCase {
	quoteRepository: QuoteRepository;

	constructor(quoteRepository: QuoteRepository) {
		this.quoteRepository = quoteRepository;
	}

	async execute(): Promise<QuoteResponseModel[] | []> {
		const result = await this.quoteRepository.getQuotes();
		return result;
	}
}
