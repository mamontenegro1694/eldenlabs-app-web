import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MaterialModule } from 'src/app/material/material.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['eldenlabs@celsia.com', [Validators.required]],
      password: ['123456', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  formSubmit(): void {
    const email: string = this.email?.value;
    const password: string = this.password?.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        console.log('Authenticated...');
        this.router.navigate(['.']);
      },
      error: (err) => console.error(err)
    });
  }

  // FormControl getters
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
