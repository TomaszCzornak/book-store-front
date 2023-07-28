import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from "../core/services/admin.service";
import {Router} from "@angular/router";
import {BookDto} from "../core/models/interfaces/book";
import {FormsService} from "../core/services/forms.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {


  // bookForm!: FormGroup
  normalForm!: FormGroup
  errorMessage = '';
  urlPattern = '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$';


  // public initForm() {
    bookForm = new FormGroup({
      // Book: new FormGroup({
      id: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.max(2),
        ],
        // validators: [],
        nonNullable: true,
      }),
      title: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
        // validators: [],
        nonNullable: true,
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
        })
      }),
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
  // }

  constructor(private adminService: AdminService, private router: Router, private formService: FormsService) {
  }

  get controls(){
    return this.bookForm.controls;

  }


  onSubmitBookForm() {
    console.log('onSubmitBookForm');
    console.log(this.controls.constructor.name);
    const requestBody = this.bookForm.getRawValue();

    // const requestData: BookDto = {
    //   id: this.bookForm.controls['id'].value,
    //   title: this.bookForm.controls['title'].value,
    //   authorDto: {
    //     id: this.bookForm.controls['authorDto'].get('id')?.value,
    //     firstName: this.bookForm.controls['authorDto'].get('firstName')?.value as string,
    //     lastName: this.bookForm.controls['authorDto'].get('lastName')?.value as string,
    //     authorPhotoUrl: this.bookForm.controls['authorDto'].get('authorPhotoUrl')?.value as string
    //   },
    //   publisher: this.bookForm.controls['publisher'].value,
    //   bookPhoto: this.bookForm.controls['bookPhoto'].value
    // }

    const forRequestBody: BookDto = {
      id: requestBody.id as unknown as number,
      title: requestBody.title as string,
      authorDto: {
        id: requestBody.authorDto.id as unknown as number,
        firstName: requestBody.authorDto.firstName as string,
        lastName: requestBody.authorDto.lastName as string,
        authorPhotoUrl: requestBody.authorDto.authorPhotoUrl as string
      },
      publisher: requestBody.publisher as string,
      bookPhoto: requestBody.bookPhoto as string
      }

    this.adminService.postBook(forRequestBody).subscribe({
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
    return control.hasError('email') ? 'Niepoprawny email' : '';
  }

}

