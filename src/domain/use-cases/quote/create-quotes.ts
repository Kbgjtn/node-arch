import { QuoteRepository } from "@/domain/interfaces/repositories/quote-repository";
import { CreateQuotesUseCase } from "@/domain/interfaces/use-cases/quote/create-quotes-use-case";
import { QuoteRequestModel } from "@/domain/models/quote";

export class CreateQuotes implements CreateQuotesUseCase {
  quoteRepository: QuoteRepository;

  constructor(quoteRepository: QuoteRepository) {
    this.quoteRepository = quoteRepository;
  }

  async execute(quotes: QuoteRequestModel[]): Promise<void> {
    return await this.quoteRepository.createQuotes(quotes);
  }
}
