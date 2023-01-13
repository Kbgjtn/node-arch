import { QuoteDataSource } from "@/data/interfaces/data-sources/quote-data-source";
import { QuoteRepository } from "@/domain/interfaces/repositories/quote-repository";
import { QuoteRequestModel, QuoteResponseModel } from "@/domain/models/quote";

export class QuoteRepositoryImpl implements QuoteRepository {
	quoteDataSource: QuoteDataSource;

	constructor(quoteDataSource: QuoteDataSource) {
		this.quoteDataSource = quoteDataSource;
	}

	async createQuote(quote: QuoteRequestModel): Promise<void> {
		await this.quoteDataSource.create(quote);
	}

	async createQuotes(quotes: QuoteRequestModel[]): Promise<void> {
		await this.quoteDataSource.createMany(quotes);
	}

	async updateQuote(id: string, data: QuoteRequestModel): Promise<void> {
		await this.quoteDataSource.updateOne(id, data);
	}

	async deleteQuote(id: string): Promise<void> {
		await this.quoteDataSource.deleteOne(id);
	}

	async getQuote(id: string): Promise<QuoteResponseModel | null> {
		const result = await this.quoteDataSource.getOne(id);
		return result;
	}

	async getQuotes(): Promise<[] | QuoteResponseModel[]> {
		const result = await this.quoteDataSource.getAll();
		return result;
	}
}
