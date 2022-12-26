import { QuoteRequestModel } from "@/domain/models/quote";

export interface CreateQuoteUseCase {
	execute(quote: QuoteRequestModel): Promise<void>;
}
