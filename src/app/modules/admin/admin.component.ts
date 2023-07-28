import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from "../core/services/admin.service";
import {Router} from "@angular/router";
import {BookResponse} from "../core/models/interfaces/book";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {
    this.initForm2();
    this.initForm();
  }

  bookForm!: FormGroup
  normalForm!: FormGroup
  errorMessage = '';
  urlPattern = '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$';

  constructor(private adminService: AdminService, private router: Router) {
  }

  get controls() {
    return this.bookForm.controls
  }

  private initForm() {
    this.bookForm = new FormGroup({
      // Book: new FormGroup({
      id: new FormControl('', {
        // validators: [
        //   Validators.required,
        //   Validators.minLength(3),
        //   Validators.maxLength(30),
        // ],
        validators: [],
        // nonNullable: true,
      }),
      title: new FormControl('', {
        // validators: [
        //   Validators.required,
        //   Validators.minLength(3),
        //   Validators.maxLength(30),
        // ],
        validators: [],
        // nonNullable: true,
      }),
      authorDto: new FormGroup({
      firstName: new FormControl('', {
        // validators: [Validators.minLength(3), Validators.maxLength(20)],
        validators: [],
        // nonNullable: true,
      }),
        id: new FormControl('', {
        // validators: [Validators.minLength(3), Validators.maxLength(20)],
        validators: [],
        // nonNullable: true,
      }),
      lastName: new FormControl('', {
        // validators: [Validators.minLength(3), Validators.maxLength(20)],
        validators: [],
        // nonNullable: true,
      }),
      authorPhotoUrl: new FormControl('', {
        // validators: [Validators.required, Validators.pattern(this.urlPattern)],
        validators: [],
        // nonNullable: true,
      })}),
      publisher: new FormControl('', {
        // validators: [Validators.required, Validators.pattern(this.urlPattern)],
        validators: [],
        // nonNullable: true,
      }),
      bookPhoto: new FormControl('', {
        // validators: [Validators.required, Validators.pattern(this.urlPattern)],
        validators: [],
        // nonNullable: true,
      }),
    });
  }

  private initForm2() {
    this.normalForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.normalForm.value);
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
    return control.hasError('pattern') ? 'Niepoprawny URL' : '';
  }

  onSubmitBookForm() {
    console.log('onSubmitBookForm');
    debugger;
    const BookDto = this.bookForm.getRawValue();
    console.log('to jest autor ' + BookDto.firstName)
    const bookResponse: BookResponse = {
      bookDto: {
        id: BookDto.id,
        title: BookDto.title,
        authorDto: {
          id: BookDto.id,
          firstName: BookDto.firstName,
          lastName:BookDto.lastName,
          authorPhotoUrl: BookDto.authorPhotoUrl
        },
        publisher: BookDto.publisher,
        bookPhoto: BookDto.bookPhoto
      }
    }

    debugger;
    console.log('czy autor jest w bookResponse ' + bookResponse.bookDto.authorDto.firstName);
    console.log(JSON.stringify(BookDto) + ' to jest jason')
    this.adminService.postBook(BookDto).subscribe({
      next: (value) => {
        console.log(value + 'to jest wyslana wartosc')
        this.router.navigate(['api/book/all'])
      },
      error: (err) => {
        this.errorMessage = "wystąpił błąd";
      }
    })
  }


}

