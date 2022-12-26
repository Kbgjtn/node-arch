export interface Author extends Genre {
	fullname: string;
	country?: string;
	profession: string;
}

export interface Genre {
	name: string;
}

export interface Quote {
	title: string;
	author: Author;
	publishDate?: number;
	topic?: string[];
}
