import { Component, Input } from '@angular/core';
import { BookDto } from '../../core/models/interfaces/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  @Input() book!: BookDto;
  @Input() id!: number;
  @Input() i!: number;
}
