import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../enums/user-role.enum';
import { LoginDto, LoginResponseDto } from '../interfaces/userInterfaces';
import { RegistrationServiceService } from '../services/registration-service/registration-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  public submittingData(): void {
    const loginDto: LoginDto = this.loginForm.value;

    this.registrationService.login(loginDto).subscribe({
      next: (response: LoginResponseDto) => {
        this.registrationService.saveLoginData(response);

        console.log(response);

        this.loginForm.reset();

        if (response.role === UserRole.ROLE_USER) {
          this.router.navigate(['user']);
        } else if (response.role === UserRole.ROLE_ADMIN) {
          this.router.navigate(['admin']);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
