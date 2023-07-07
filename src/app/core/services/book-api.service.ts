import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookService} from "./book.service";
import {Observable} from "rxjs";
import {Book} from "../shared/interfaces/book";
import {environment} from "../../../environments/environment.development";
import {BookResponse} from "../shared/interfaces/book-response";

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http: HttpClient, private bookService: BookService) {
  }

  getAllBooks(): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${environment.proxyUrl}/api/book/all`)
  }
  getBook(id: number):Observable<Book> {
    return this.http.get<Book>(`${environment.proxyUrl}/api/book/${id}`);
  }

}
