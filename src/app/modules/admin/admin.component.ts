import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from "../core/services/admin.service";
import {Router} from "@angular/router";
import {BookRequest} from "../core/models/interfaces/book";
import {FormsService} from "../core/services/forms.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {

  errorMessage = '';
  urlPattern = '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$';
  publishers = ['PWN', 'ZNAK', 'AGORA', 'WYDAWNICTWO_LITERACKIE'];

    bookForm = new FormGroup({
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
    } );



  constructor(private adminService: AdminService, private router: Router, private formService: FormsService) {
    this.bookForm.controls['title'].valueChanges.subscribe(val => {
        console.log('testowanie');
        if (val.length == 3) {
          this.bookForm.controls['authorDto'].get('lastName')?.setErrors({
            incorrect: true,
            message: 'Panie dzieju, nie możesz mieć tak krótkiego nazwiska!',
          });
        } else {
          this.bookForm.controls['authorDto'].get('lastName')?.setErrors(null);
        }
      }
    )
    ;
  }

  get controls() {
    return this.bookForm.controls;
  }


  onSubmitBookForm() {
    console.log('onSubmitBookForm');
    console.log(this.controls.constructor.name);
    // można pobrać wszystkie dane formularza za pomocą metody getRawValue()
    const forRequestBody = this.bookForm.getRawValue();
    //następnie z każdego pola forRequestBody można pobrać wartość za pomocą metody .value
    // const requestData: BookDto = {
    //   id: this.bookForm.controls['id'].value,
    //   title: this.bookForm.controls['title'].value,
    //   authorDto: {
    //     id: this.bookForm.controls['authorDto'].get('id')?.value,
    //     firstName: this.bookForm.controls['authorDto'].get('firstName')?.value as string,


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
    return control.hasError('email') ? 'Niepoprawny email' : '';

  }


  printOutMethod() {
    console.log(this.bookForm)
  }
}

