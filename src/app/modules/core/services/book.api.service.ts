import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.development';
import {BookResponse} from "../models/interfaces/book";
import {BookResponseArray} from "../models/interfaces/book-response";


@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<BookResponseArray> {
    return this.http.get<BookResponseArray>(`${environment.proxyUrl}/api/book/all`);
  }

  getBook(id: number): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${environment.proxyUrl}/api/book/${id}`);
  }

  login(data: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(environment.proxyUrl + '/api/login', data);
  }

  isUp(): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(environment.proxyUrl + '/api/admin/isUp', {headers});
  }
}
