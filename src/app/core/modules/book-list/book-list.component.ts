import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Book} from "../../shared/interfaces/book";
import {BookService} from "../../services/book.service";
import {BookApiService} from "../../services/book-api.service";
import {Subscription} from "rxjs";
import {SlickCarouselComponent} from "ngx-slick-carousel";
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.computeVisibleSlides();
  }

  books!: Book[];
  errorMessage = '';
  sub!: Subscription;
  @Output() imageUrl!: String[];
  jQuery: any;


  visibleCards = 4;
  cardWidth = 404;
  currentSlide = 0;
  marginBetweenCards = 2;
  slides!:Book[];


  slideConfig = {infinite: true, "slidesToShow": 2, "slidesToScroll": 1, variableWidth: true};

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    this.currentSlide = e.currentSlide;
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  @ViewChild('slickModal') slickModal?: SlickCarouselComponent;

  constructor(private bookService: BookService, private bookApiService: BookApiService, private ref: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.computeVisibleSlides();
  }

  ngOnInit(): void {
    this.slideConfig.slidesToShow = 2;
    this.bookApiService.getAllBooks().subscribe({
        next: response => {
          this.books = response.bookResponseList
          this.slides = response.bookResponseList
          this.imageUrl = response.bookResponseList.map(element => element.bookPhoto)
        }
      }
    );


  }

  public test(): void {
    console.log(this.books);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  computeVisibleSlides() {
    const slickListElement = (this.ref.nativeElement as HTMLElement).querySelector('mat-card-container');

    if (slickListElement) {
      const slickWidth = (slickListElement as HTMLDivElement).clientWidth;
      this.visibleCards = Math.floor(slickWidth / this.cardWidth);
      this.slideConfig = {...this.slideConfig, slidesToShow: this.visibleCards};
      console.log(this.visibleCards + ' tyle jest widocznych kart');


    }
    this.cdr.detectChanges();
  }

}
