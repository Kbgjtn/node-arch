import { QuoteResponseModel } from "@/domain/models/quote";

export interface GetAllQuotesUseCase {
	execute(): Promise<QuoteResponseModel[] | []>;
}
