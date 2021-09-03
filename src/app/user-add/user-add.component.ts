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
      password: ['', [Validators.required, Validators.minLength(8), createPasswordStringValidator()]],
      num1: [null, Validators.required],
      num2: [null, Validators.required],
    },
      {
        validators: [createDateRangeValidator()]
      });
  }

  onSubmit() {
    console.log(this.form.getRawValue())
  }

}

//Custum Validator Reative Forms we manipulate the field form "control: AbstractControl"
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

//Custom multi-field validator forms. In multi field we manipulate the entire form "form: FormGroup"
function createDateRangeValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const num1:number = form.get("num1").value;
    const num2:number = form.get("num2").value;
    if (num1 && num2) {
      const isMAxValid = (num2 - num1 > 0);
      return isMAxValid ? null : {MaxNumber:true};
    }
    return null;
  }
}
