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

export interface BookRequest {
  title: string;
  authorDto: {
    id: number,
    firstName: string,
    lastName: string,
    authorPhotoUrl: string
  }
  publisher: string,
  bookPhoto: string
}
