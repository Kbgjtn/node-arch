export interface DeleteQuoteUseCase {
	execute(id: string): Promise<void>;
}
