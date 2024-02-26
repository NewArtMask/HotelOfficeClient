import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RegistrationResponseDto, UserDto } from '../interfaces/userInterfaces';
import { RegistrationServiceService } from '../services/registration-service/registration-service.service';
import { passwordMatchValidator } from '../directives/password-match.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  userForm!: FormGroup;
  isButtonDisabled = true;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationServiceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToFormUpdate();
  }

  private initForm(): void {
    this.userForm = this.fb.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  get name() {
    return this.userForm.controls['name'];
  }
  get surname() {
    return this.userForm.controls['surname'];
  }
  get email() {
    return this.userForm.controls['email'];
  }
  get password() {
    return this.userForm.controls['password'];
  }
  get confirmPassword() {
    return this.userForm.controls['confirmPassword'];
  }

  private subscribeToFormUpdate(): void {
    this.userForm.statusChanges.subscribe((status: FormControlStatus) => {
      this.isButtonDisabled = status === 'INVALID';
    });
  }

  public submittingData(): void {
    if (this.userForm.valid) {
      const userDto: UserDto = {
        name: this.name?.value,
        surname: this.surname?.value,
        email: this.email?.value,
        password: this.password?.value,
      };

      this.isButtonDisabled = true;
      this.userForm.disable();

      this.registrationService.registerUser(userDto).subscribe({
        next: (response: RegistrationResponseDto) => {
          console.log('server response on saving user data: ', response);
          this.userForm.reset();
          this.userForm.enable();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this.router.navigate(['login']);
        },
        error: (error: RegistrationResponseDto) => {
          console.log(error);
          this.userForm.reset();
          this.userForm.enable();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message,
          });
        },
      });
    }
  }
}
