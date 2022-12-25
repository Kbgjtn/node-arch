import { QuoteRequestModel } from "@/domain/models/quote";

export interface UpdateQuoteUseCase {
	execute(id: string, data: QuoteRequestModel): Promise<void>;
}
