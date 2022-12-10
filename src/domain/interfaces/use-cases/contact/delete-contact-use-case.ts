export interface DeleteContactUseCase {
	execute(id: String): Promise<void>;
}
