import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookDto, BookRequest, BookResponse,} from '../models/interfaces/book';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.proxyUrl;
  constructor(private httpClient: HttpClient) {}

  postBook(book: BookRequest): Observable<BookResponse> {
    return this.httpClient.post<BookResponse>(
      `${this.apiUrl}/api/admin/add`,
      book,
    );
  }
}
