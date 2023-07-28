import {FormControl, FormGroup} from '@angular/forms';

export interface BookResponseOld {
  id: number;
  title: string;
  authorDto: AuthorDto;
  bookPhoto: string;
}
// export class BookDto implements BookResponse {
//   constructor(
//     public id: number,
//     public title: string,
//     public authorDto: AuthorDto,
//     public bookPhoto: string,
//   ) {}
// }

export type PostBookWithAuthor = Omit<BookResponse, 'id'>;

// export interface GetBooksResponse {
//   books: Book[];
//   totalCount: number;
// }
export interface PostBookWithAuthorForm {
  title: FormControl<string>;
  authorDto: FormGroup<{
        firstName: FormControl<string>;
        lastName: FormControl<string>;
        authorPhotoUrl: FormControl<string>;
      }>;
  bookPhoto: FormControl<string>;
}
export interface BookResponse {
  bookDto: BookDto;
}

export interface BookDto {
  id: number;
  title: string;
  authorDto: {
    id: number,
    firstName: string,
    lastName: string,
    authorPhotoUrl: string
  }
  publisher: string,
  bookPhoto: string,
}
export interface AuthorDto {
  id: string,
  firstName: string,
  lastName: string,
  authorPhotoUrl: string,
}

