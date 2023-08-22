import {AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from "../core/services/admin.service";
import {Router} from "@angular/router";
import {BookRequest} from "../core/models/interfaces/book";
import {FormsService} from "../core/services/forms.service";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {formatDate} from "@angular/common";

@Component({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {

  errorMessage = '';
  urlPattern = '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$';
  publishers = ['PWN', 'ZNAK', 'AGORA', 'WYDAWNICTWO_LITERACKIE'];
  date?: string;
  submitted = false;

  bookForm = new FormGroup({
    dateBookCreation: new FormControl('', {
      validators: [Validators.required],

    }),
    dateAuthor: new FormControl('', {
      validators: [Validators.required],

    }),
    dateCategory: new FormControl('', {
      validators: [Validators.required],

    }),
    category: new FormControl('', {
      validators: [Validators.required],

    }),
    // Book: new FormGroup({
    title: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
      // validators: [],
      nonNullable: true,
    }),
    authorBookDto: new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],
        // validators: [],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],
        // validators: [],
        nonNullable: true,
      }),
    }),
    authorDto: new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],
        // validators: [],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],
        // validators: [],
        nonNullable: true,
      }),
      authorPhotoUrl: new FormControl('', {
        validators: [Validators.pattern(this.urlPattern)],
        // validators: [],
        nonNullable: true,
      })
    }),
    publisher: new FormControl('', {
      validators: [Validators.required],
      // validators: [],
      nonNullable: true,
    }),
    bookPhoto: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.urlPattern)],
      // validators: [],
      nonNullable: true,
    }),
  });

  constructor(private adminService: AdminService, private router: Router, private formService: FormsService,@Inject(LOCALE_ID) private locale: string) {
    // this.bookForm.controls['title'].valueChanges.subscribe(val => {
    //     console.log('testowanie');
    //     if (val.length == 3) {
    //       this.bookForm.controls['authorDto'].get('lastName')?.setErrors({
    //         incorrect: true,
    //         message: 'Panie dzieju, nie możesz mieć tak krótkiego nazwiska!',
    //       });
    //     } else {
    //       this.bookForm.controls['authorDto'].get('lastName')?.setErrors(null);
    //     }
    //   }
    // );
    this.bookForm.controls['dateBookCreation'].valueChanges.subscribe(val => {
     const dateTitle = formatDate(val as string, 'yyyy-MM-dd', 'en_US');
     const dateAuthor = formatDate(this.bookForm.controls['dateAuthor'].value as string, 'yyyy-MM-dd', 'en_US');
        if (dateTitle < dateAuthor) {
          this.bookForm.controls['dateBookCreation'].setErrors({
            incorrect: true,
            message: 'Panie dzieju, książka nie może być starsza od jej autora!',
          });
        } else {
          this.bookForm.controls['dateBookCreation'].get('lastName')?.setErrors(null);
        }
      }
    );

    this.bookForm.controls['dateAuthor'].valueChanges.subscribe(val => {
      let dateAuthor = formatDate(val as string, 'yyyy-MM-dd', 'en_US');
      let dateTitle = formatDate(this.bookForm.controls['dateBookCreation'].value as string, 'yyyy-MM-dd', 'en_US');
      if (dateAuthor > dateTitle)  {
          this.bookForm.controls['dateAuthor'].setErrors({
            incorrect: true,
            message: 'Panie dzieju, autor książki nie może być młodszy od jego książki!',
          });
        } else {
        this.bookForm.controls['dateAuthor'].setErrors(null);
        }
      }
    );

    this.bookForm.controls['dateCategory'].valueChanges.subscribe(val => {
        let dateCategory = formatDate(val as string, 'yyyy-MM-dd', 'en_US');
        let dateBook = formatDate(this.bookForm.controls['dateBookCreation'].value as string, 'yyyy-MM-dd', 'en_US');
        if (dateCategory < dateBook)  {
          this.bookForm.controls['dateCategory'].setErrors({
            incorrect: true,
            message: 'Panie dzieju, kategoria musi powstać później niż sama książka',
          });
        } else {
          this.bookForm.controls['dateCategory'].setErrors(null);
        }
      }
    );

    this.bookForm.controls['authorDto'].get('lastName')?.valueChanges.subscribe(val => {
        const authorBookLastName = this.bookForm.controls['authorBookDto'].get('lastName')?.value;
        if (authorBookLastName !== '' && val !== authorBookLastName) {
          this.bookForm.controls['authorDto'].get('lastName')?.setErrors({
            incorrect: true,
            message: 'Panie dzieju, nazwisko autora musi być takie same jak nazwisko autora książki!',

          });
        } else {
          this.bookForm.controls['authorDto'].get('lastName')?.setErrors(null);
        }
      }
    );

    this.bookForm.controls['authorBookDto'].get('lastName')?.valueChanges.subscribe(val => {
        const authorLastName = this.bookForm.controls['authorDto'].get('lastName')?.value;
        if (authorLastName !== '' && val !== authorLastName) {
          this.bookForm.controls['authorBookDto'].get('lastName')?.setErrors({
            incorrect: true,
            message: 'Komunikat autor Book last name!',

          });
        } else {
          this.bookForm.controls['authorBookDto'].get('lastName')?.setErrors(null);
        }
      }
    );
  }

    get controls(){
      return this.bookForm.controls;
    }


    onSubmitBookForm(){


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

    getErrorMessage(control
  :
    FormControl
  )
    {
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
      return control.hasError('email') ? 'Niepoprawny email' : '';

    }

  ngOnInit(): void {
   debugger;
  }

  ngAfterViewInit(): void {
    debugger;
  }

  }

