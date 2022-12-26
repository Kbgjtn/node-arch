import { QuoteRequestModel, QuoteResponseModel } from "@/domain/models/quote";

export interface QuoteRepository {
	createQuote(quote: QuoteRequestModel): Promise<void>;
	createQuotes(quotes: QuoteRequestModel[]): Promise<void>;
	updateQuote(id: string, data: QuoteRequestModel): Promise<void>;
	deleteQuote(id: string): Promise<void>;
	getQuote(id: string): Promise<QuoteResponseModel | null>;
	getQuotes(): Promise<QuoteResponseModel[] | []>;
}
