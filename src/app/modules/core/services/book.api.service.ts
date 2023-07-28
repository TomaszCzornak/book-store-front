import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { BookResponse } from '../models/interfaces/book-response';
import { BookDto } from '../models/interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${environment.proxyUrl}/api/book/all`);
  }
  getBook(id: number): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${environment.proxyUrl}/api/book/${id}`);
  }
}
