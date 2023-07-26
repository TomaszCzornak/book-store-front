import { AuthorDto } from './authorDto';
import { FormControl } from '@angular/forms';

export interface BookResponse {
  id: number;
  title: string;
  authorDto: AuthorDto;
  bookPhoto: string;
}
export class Book implements BookResponse {
  constructor(
    public id: number,
    public title: string,
    public authorDto: AuthorDto,
    public bookPhoto: string,
  ) {}
}

export type PostBookWithAuthor = Omit<BookResponse, 'id'>;

export interface GetBooksResponse {
  books: Book[];
  totalCount: number;
}
export interface PostBookWithAuthorForm {
  title: FormControl<string>;
  authorDto: FormControl<AuthorDto>;
  bookPhoto: FormControl<string>;
}
