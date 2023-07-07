import {Component, OnInit} from '@angular/core';
import {Book} from "../../../shared/interfaces/book";
import {BookApiService} from "../../../services/book-api.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-book-single',
  templateUrl: './book-single.component.html',
  styleUrls: ['./book-single.component.scss']
})
export class BookSingleComponent implements OnInit {

  bookSingle$!: Observable<Book[]>;
  errorMessage = '';
  sub!: Subscription;


  constructor(private bookApiService: BookApiService) {

  }

  ngOnInit(): void {
    // this.bookSingle$ = this.bookApiService.getAllBooks();


  }
}
