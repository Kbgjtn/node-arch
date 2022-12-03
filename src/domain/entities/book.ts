export class Author {
    firstName: string;
    lastName?: string;
}

export class Genre {
    name: string;
}

export class Book {
    title: string;
    author: Author;
    genre: Genre;
    publishDate: Date;
}
