import { Author, Genre } from "../entities/quote";

export interface QuoteRequestModel {
	author: Author;
	genre: Genre;
	publishDate?: number;
	topic?: string[];
}

export interface QuoteResponseModel {
	readonly id: string;
	readonly author: Author;
	readonly genre: Genre;
	readonly publishDate?: number;
	readonly topic?: string[];
}
