import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Book} from "../../shared/interfaces/book";
import {BookService} from "../../services/book.service";
import {BookApiService} from "../../services/book-api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {

  books!: Book[];
  errorMessage = '';
  sub!: Subscription;
  @Output() imageUrl!:String[];

  // @Input() book!: Book;


  constructor(private bookService: BookService, private bookApiService: BookApiService) {
  }

  ngOnInit(): void {
    // this.sub = this.bookService.booksChanged.subscribe({
    //   next: booksArray => this.books = booksArray
    // })

    this.bookApiService.getAllBooks().subscribe({
      next: response => {
      this.books = response.bookResponseList
      this.imageUrl = response.bookResponseList.map(element=> element.bookPhoto)}
      }
    );


  }

  public test(): void {
    console.log(this.books);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
