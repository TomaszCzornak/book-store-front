import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

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
  id: number,
  firstName: string,
  lastName: string,
  authorPhotoUrl: string,
}

