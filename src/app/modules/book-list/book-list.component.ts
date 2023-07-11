import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Output, ViewChild} from "@angular/core";
import {Book} from "../core/models/interfaces/book";
import {Subscription} from "rxjs";
import {SlickCarouselComponent} from "ngx-slick-carousel";
import {BookApiService} from "../core/services/book.api.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.computeVisibleSlides();
  }

  books!: Book[];
  errorMessage = '';
  sub!: Subscription;
  @Output() imageUrl!: String[];
  jQuery: any;


  visibleCards = 5;
  cardWidth = 600;
  currentSlide = 1;
  marginBetweenCards = 2;
  slides!: Book[];


  slideConfig = {
    infinite: true,
    "slidesToShow": 3,
    "slidesToScroll": 1,
    variableWidth: true,
    centerMode: true,
    centerPadding: '100px',
    focusOnSelect: true,
    initialSlide: 3
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    this.currentSlide = e.currentSlide;
    console.log('afterChange');
    console.log(e.currentSlide + ' to jest akutalny slajd');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
    console.log(e.currentSlide + ' to jest beforeChange slajd');

  }

  @ViewChild('slickModal') slickModal?: SlickCarouselComponent;

  constructor(private bookApiService: BookApiService, private ref: ElementRef, private cdr: ChangeDetectorRef) {
  }

  // ngAfterViewInit() {
  //   this.computeVisibleSlides();
  // }

  ngOnInit(): void {
    this.currentSlide = 1;
    this.bookApiService.getAllBooks().subscribe({
        next: response => {
          this.books = response.bookResponseList
          this.slides = response.bookResponseList
          this.imageUrl = response.bookResponseList.map((element: { bookPhoto: String; }) => element.bookPhoto)
          console.log(this.slides.length + ' to jest ilość elementów')
        }
      }
    );
  }


  computeVisibleSlides() {
    const slickListElement = (this.ref.nativeElement as HTMLElement).querySelector('.slide-list');
    console.log('metoda compute');
    if (slickListElement) {
      const slickWidth = (slickListElement as HTMLDivElement).offsetWidth;
      this.visibleCards = Math.floor(slickWidth / this.cardWidth);
      this.slideConfig = {...this.slideConfig, slidesToShow: this.visibleCards};
      console.log(this.visibleCards + ' tyle jest widocznych kart');

    }
    this.cdr.detectChanges();
  }


}
