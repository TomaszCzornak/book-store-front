import {AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from "../core/services/admin.service";
import {Router} from "@angular/router";
import {BookRequest} from "../core/models/interfaces/book";
import {FormsService} from "../core/services/forms.service";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {formatDate} from "@angular/common";
import {Subscription} from "rxjs";
import {capitalLetterValidator} from "./custom-validators";

@Component({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnDestroy {
  // hello :D Tutaj Adrian
  //a tutaj Tomek
  errorMessage = '';
  urlPattern = '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$';
  publishers = ['PWN', 'ZNAK', 'AGORA', 'WYDAWNICTWO_LITERACKIE'];
  date?: string;
  subscription?: Subscription;

  bookForm = new FormGroup({
    dateBookCreation: new FormControl('', {
      validators: [Validators.minLength(8)],

    }),
    dateAuthor: new FormControl('', {
      validators: [Validators.minLength(8)],

    }),
    dateCategory: new FormControl('', {
      validators: [Validators.minLength(8)],

    }),
    category: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(20)],

    }),
    categoryCategory: new FormGroup({
      categoryCategory: new FormControl('', {validators: [Validators.minLength(3), Validators.maxLength(20)]}),
    }),
    // Book: new FormGroup({
    title: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],

      nonNullable: true,
    }),
    authorBookDto: new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20), capitalLetterValidator],

        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],

        nonNullable: true,
      }),
    }),
    authorDto: new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],

        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],

        nonNullable: true,
      }),
      authorPhotoUrl: new FormControl('', {
        // TODO:AR -> Zobacz jak zrobić własny validator i go podac jako jeden z walidatorów do tej tablicy poniżej
        validators: [Validators.pattern(this.urlPattern)],

        nonNullable: true,
      })
    }),
    publisher: new FormControl('', {
      validators: [Validators.required],

      nonNullable: true,
    }),
    bookPhoto: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.urlPattern)],

      nonNullable: true,
    }),
  });

  // TODO:AR -> logika walidacji do @OnInit
  constructor(private adminService: AdminService, private router: Router, private formService: FormsService, @Inject(LOCALE_ID) private locale: string) {
    // TODO:AR -> każda walidacja do osobnej metody
    this.subscription = this.bookForm.controls['dateBookCreation']?.valueChanges.subscribe(val => {
        console.log("Hello from this.bookForm.controls['dateBookCreation']");
        const dateTitle = formatDate(val as string, 'yyyy-MM-dd', 'en_US');
        const dateAuthor = formatDate(this.bookForm.controls['dateAuthor'].value as string, 'yyyy-MM-dd', 'en_US');
        const dateCategory = formatDate(this.bookForm.controls['dateCategory'].value as string, 'yyyy-MM-dd', 'en_US')
        if (dateAuthor !== '' && dateTitle < dateAuthor) {
          this.bookForm.controls['dateBookCreation'].setErrors({
            incorrect: true,
            message: 'Panie dzieju, książka nie może być starsza od jej autora!',
          });
        } else {
          this.bookForm.controls['dateBookCreation'].setErrors(null);
          this.bookForm.controls['dateAuthor'].setErrors(null);
          this.bookForm.controls['dateCategory'].setErrors(null);

        }
        if (dateCategory !== '' && dateTitle > dateCategory) {
          this.bookForm.controls['dateBookCreation'].setErrors({
            incorrect: true,
            message: 'Książka nie może być nowsza od kategorii!',
          });
        } else {
          this.bookForm.controls['dateBookCreation'].setErrors(null);
          this.bookForm.controls['dateCategory'].setErrors(null);
        }
      }
    );

    this.subscription = this.bookForm.controls['dateAuthor'].valueChanges.subscribe(val => {
        console.log("Hello from this.bookForm.controls['dateAuthor']");
        let dateAuthor = formatDate(val as string, 'yyyy-MM-dd', 'en_US');
        let dateTitle = formatDate(this.bookForm.controls['dateBookCreation'].value as string, 'yyyy-MM-dd', 'en_US');
        if (dateTitle !== '' && dateAuthor > dateTitle) {
          this.bookForm.controls['dateAuthor'].setErrors({
            incorrect: true,
            message: 'Panie dzieju, autor książki nie może być młodszy od jego książki!',
          });
        } else {
          this.bookForm.controls['dateAuthor'].setErrors(null);
          this.bookForm.controls['dateBookCreation'].setErrors(null);
        }
      }
    );

    this.subscription = this.bookForm.controls['dateCategory'].valueChanges.subscribe(val => {
        console.log("Hello from this.bookForm.controls['dateCategory']");
        let dateCategory = formatDate(val as string, 'yyyy-MM-dd', 'en_US');
        let dateBook = formatDate(this.bookForm.controls['dateBookCreation'].value as string, 'yyyy-MM-dd', 'en_US');
        if (dateCategory !== '' && dateCategory < dateBook) {
          this.bookForm.controls['dateCategory'].setErrors({
            incorrect: true,
            message: 'Panie dzieju, kategoria musi powstać później niż sama książka',
          });
        } else {
          this.bookForm.controls['dateCategory'].setErrors(null);
          this.bookForm.controls['dateBookCreation'].setErrors(null);
        }
      }
    );

    this.subscription = this.bookForm.controls['authorDto'].get('lastName')?.valueChanges.subscribe(val => {
        console.log("Hello from this.bookForm.controls['authorDto']");
        const authorBookLastName = this.bookForm.controls['authorBookDto'].get('lastName')?.value;
        if (authorBookLastName !== '' && val !== authorBookLastName) {
          this.bookForm.controls['authorDto'].get('lastName')?.setErrors({
            incorrect: true,
            message: 'Panie dzieju, nazwisko autora musi być takie same jak nazwisko autora książki!',

          });
        } else {
          this.bookForm.controls['authorDto'].get('lastName')?.setErrors(null);
          this.bookForm.controls['authorBookDto'].get('lastName')?.setErrors(null);

        }
      }
    );

    this.subscription = this.bookForm.controls['authorBookDto'].get('lastName')?.valueChanges.subscribe(val => {
        console.log("Hello from this.bookForm.controls['authorBookDto']");
        const authorLastName = this.bookForm.controls['authorDto'].get('lastName')?.value;
        if (authorLastName !== '' && val !== authorLastName) {
          this.bookForm.controls['authorBookDto'].get('lastName')?.setErrors({
            incorrect: true,
            message: 'Nazwisko Autora książki musi być takie same jak nazwisko autora!',

          });
        } else {
          this.bookForm.controls['authorBookDto'].get('lastName')?.setErrors(null);
          this.bookForm.controls['authorDto'].get('lastName')?.setErrors(null);

        }
      }
    );

    this.subscription = this.bookForm.controls['category']?.valueChanges.subscribe(val => {
        console.log("Hello from this.bookForm.controls['category']");
        const categoryCategory = this.bookForm.controls['categoryCategory'].get('categoryCategory')?.value;
        if (categoryCategory !== '' && val !== categoryCategory) {
          this.bookForm.controls['category'].setErrors({
            incorrect: true,
            message: 'Kategoria musi być taka sama jak kategoria kategorii!',
          });
        } else {
          this.bookForm.controls['category']?.setErrors(null);
          this.bookForm.controls['categoryCategory'].get('categoryCategory')?.setErrors(null);

        }
      }
    );
    this.subscription = this.bookForm.controls['categoryCategory'].get('categoryCategory')?.valueChanges.subscribe(val => {
        console.log("Hello from this.bookForm.controls['categoryCategory']");
        const category = this.bookForm.controls['category'].value;
        if (category !== '' && val !== category) {
          this.bookForm.controls['categoryCategory'].get('categoryCategory')?.setErrors({
            incorrect: true,
            message: 'Kategoria kategorii musi być taka sama jak kategoria!',
          });
        } else {
          this.bookForm.controls['categoryCategory'].get('categoryCategory')?.setErrors(null);
          this.bookForm.controls['category']?.setErrors(null);
        }
      }
    );
  }

  get controls() {
    return this.bookForm.controls;
  }


  onSubmitBookForm() {
    const RequestBody: BookRequest = {
      title: this.bookForm.controls['title'].value as string,
      authorDto: {
        id: this.bookForm.controls['authorDto'].get('id')?.value as unknown as number,
        firstName: this.bookForm.controls['authorDto'].get('firstName')?.value as string,
        lastName: this.bookForm.controls['authorDto'].get('lastName')?.value as string,
        authorPhotoUrl: this.bookForm.controls['authorDto'].get('authorPhotoUrl')?.value as string
      },
      publisher: this.bookForm.controls['publisher'].value,
      bookPhoto: this.bookForm.controls['bookPhoto'].value
    }

    this.adminService.postBook(RequestBody).subscribe({
      next: (value) => {
        this.router.navigate(['api/book/all'])
      },
      error: (err) => {
        this.errorMessage = "wystąpił błąd";
      }
    })
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Musisz wpisać jakąś wartość';
    }
    if (control.hasError('minlength')) {
      return 'Za krótka wartość';
    }
    if (control.hasError('maxlength')) {
      return 'Za długa wartość';
    }
    if (control.hasError('pattern')) {
      return 'Niepoprawny format www';
    }
    if (control.hasError('incorrect')) {
      return control.errors?.['message'];
    }
    if (control.hasError('capitalLetter')) {
      return 'Pierwsza litera musi być wielka';
    }
    return control.hasError('email') ? 'Niepoprawny email' : '';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
