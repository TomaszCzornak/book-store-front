import { Component, Input } from '@angular/core';
import { Book } from '../../core/models/interfaces/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  @Input() book!: Book;
  @Input() id!: number;
  @Input() i!: number;
}
