import { Injectable } from '@angular/core';
import {Book} from "../shared/interfaces/book";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _books: Book[] = [];
  booksChanged = new Subject<Book[]>();

  constructor() { }

  get books(): Book[] {
    return this._books.slice();
  }
  public set books(booksArray: Book[]) {
    this._books = [...booksArray]
    this.booksChanged.next(this.books)
  }

  addBook(book:Book): void {
    this._books.push(book)
    this.booksChanged.next(this.books)
  }
  deleteBook(id:number) {
    this._books = this.books.filter((book)=>book.id!=id)
    this.booksChanged.next(this.books)
  }
  // changeBookAvailability(id:number, isAvailable: boolean) {
  //   const searchBook = this.books.find(book=>book.id===id)
  //   if(searchBook) {
  //     searchBook.isAvailable = isAvailable
  //   }
  //   this.booksChanged.next(this.books)
  // }
}
