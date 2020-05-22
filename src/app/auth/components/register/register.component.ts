import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { PasswordMatch } from "../../../shared/helpers/passwordMatchValidator";

import { AuthService } from "../../../shared/services/Auth/auth.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        mobile: [null, [Validators.required]],
        password: [null, [Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validator: PasswordMatch("password", "confirmPassword"),
      }
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  register() {
    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    this.authService
      .register(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          alert("Registration Successful");
          this.router.navigate(["/login"]);
        },
        (error) => {
          alert(error);
        }
      );
  }
}
