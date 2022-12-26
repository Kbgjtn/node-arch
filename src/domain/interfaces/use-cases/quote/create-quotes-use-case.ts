import { QuoteResponseModel } from "@/domain/models/quote";

export interface CreateQuotesUseCase {
	execute(quotes: QuoteResponseModel[]): Promise<void>;
}
