import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {
    this.initForm;
  }

  submitBookForm: FormGroup | undefined;
  errorMessage = '';
  urlPattern = '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$';

  private initForm() {
    this.submitBookForm = new FormGroup({
      PostBookWithAuthorForm: new FormGroup({
        title: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
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
          validators: [Validators.required, Validators.pattern(this.urlPattern)],
          nonNullable: true,
        })
      }),

      bookPhoto: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.urlPattern)],
        nonNullable: true,
      }),
    });
  }
}

