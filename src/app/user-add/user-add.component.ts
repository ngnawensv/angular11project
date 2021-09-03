import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  //Global declaration
  form: FormGroup;

  //Dependence Injection of  FormBuilder
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createUserForm()
  }

  //
  createUserForm() {
    this.form = this.fb.group({
      email: ['', {Validators: [Validators.required, Validators.email], updateOn: 'blur'}],
      password: ['', [Validators.required, Validators.minLength(8), createPasswordStringValidator()]
      ]
    });
  }

  onSubmit() {
    console.log(this.form.getRawValue())
  }

}

//Costum Validator Reative Forms
function createPasswordStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? {passwordStrength: true} : null;
  }
}
