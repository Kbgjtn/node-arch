import { QuoteResponseModel } from "@/domain/models/quote";

export interface GetOneQuoteUseCase {
	execute(id: string): Promise<QuoteResponseModel | null>;
}
