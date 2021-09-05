import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  //Global declaration
  user: User = {};
  form: FormGroup;

  //Dependence Injection of  FormBuilder
  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  get email() {
    return this.form.controls['email'];
  }


  ngOnInit(): void {
    this.createUserForm()
  }

  //
  createUserForm() {
    this.form = this.fb.group({
      email: ['', {
        Validators: [Validators.required, Validators.email],
        asyncValidators: [userExistsValidator(this.userService)],
        updateOn: 'blur'
      }],
      password: ['', [Validators.required, Validators.minLength(8), createPasswordStringValidator()]],
    }, {
      validators: [createNoEmptyValidator()]
    });
  }

  //This method is use to add new user in data base
  onSubmit() {
    this.user = this.form.getRawValue();
    this.userService.addUser(this.user).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
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

//Use asynchronous validator forms
function userExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.findUserByEmail(control.value)
      .pipe(
        map(user => user ? {userExists: true} : null)
      );
  }
}

//multi-field control validator
function createNoEmptyValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const email: string = form.get("email").value;
    const password: string = form.get("password").value;
    const isEmpty = email.length == 0 && password.length == 0;
    return !isEmpty ? null : {MaxNumber: true};
  }
}

