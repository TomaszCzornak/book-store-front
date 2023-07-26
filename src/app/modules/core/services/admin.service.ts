import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Book,
  BookResponse,
  PostBookWithAuthor,
} from '../models/interfaces/book';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  postBook(book: PostBookWithAuthor): Observable<Book> {
    return this.httpClient.post<BookResponse>(
      `${this.apiUrl}/api/admin/addBook`,
      book,
    );
  }
}
