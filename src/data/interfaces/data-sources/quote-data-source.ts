import { QuoteRequestModel, QuoteResponseModel } from "@/domain/models/quote";

export interface QuoteDataSource {
	create(quote: QuoteRequestModel): Promise<void>;
	createMany(quotes: QuoteRequestModel[]): Promise<void>;
	getAll(): Promise<QuoteResponseModel[] | []>;
	getOne(id: string): Promise<QuoteResponseModel | null>;
	deleteOne(id: string): Promise<void>;
	updateOne(id: string, data: QuoteRequestModel): Promise<void>;
}
