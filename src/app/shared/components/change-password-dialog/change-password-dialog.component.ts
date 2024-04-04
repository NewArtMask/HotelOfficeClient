import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { ConfirmationCancellationDialogComponent } from '../confirmation-cancellation-dialog/confirmation-cancellation-dialog.component';
import { Subject, take, takeUntil } from 'rxjs';
import { passwordMatchValidator } from '../../directives/password-match.directive';
import { UserServiceService } from '../../services/user-service.service';
import { RegistrationServiceService } from '../../services/registration-service/registration-service.service';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    DynamicDialogModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    ConfirmationCancellationDialogComponent,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
})
export class ChangePasswordDialogComponent implements OnInit, OnDestroy {
  passwordForm!: FormGroup;
  confirmDialogInputData: any;
  username!: string;
  isButtonDisabled: boolean = true;

  private instance: DynamicDialogComponent | undefined;
  private destroy$: Subject<void> = new Subject();

  get currentPassword() {
    return this.passwordForm.controls['currentPassword'];
  }
  get newPassword() {
    return this.passwordForm.controls['newPassword'];
  }
  get confirmNewPassword() {
    return this.passwordForm.controls['confirmNewPassword'];
  }

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private userService: UserServiceService,
    private regService: RegistrationServiceService
  ) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToFormStatusUpdate();
    this.username =
      this.instance && this.instance.data
        ? this.instance.data['username']
        : 'username';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.ref.close();
  }

  submittingData(): void {
    this.confirmDialogInputData = {
      header: null,
      message: null,
      acceptButtonLabel: null,
      acceptSummary: null,
      acceptDetail: null,
      rejectButtonLabel: null,
      rejectSummary: null,
      rejectDetail: null,
    };
  }

  saveChanges(event: boolean): void {
    this.confirmDialogInputData = null;
    console.log('DIALOG RESPONSE: ', event);

    if (event) {
      this.provideChangingPassword();
    }
  }

  private initForm(): void {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  private subscribeToFormStatusUpdate(): void {
    this.passwordForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: FormControlStatus) => {
        this.isButtonDisabled = status === 'INVALID';
      });
  }

  private provideChangingPassword(): void {
    const oldPassword = this.currentPassword.value;
    const newPassword = this.newPassword.value;
    this.isButtonDisabled = true;

    this.userService
      .changePassword(oldPassword, newPassword)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.ref.close({
            severity: 'success',
            summary: 'Success!',
            detail: 'Password changed!',
          });
          this.regService.logOut();
          console.log('PASSWORD CHANGING:', 'Success! Password changed!');
        },
        error: () => {
          this.ref.close({
            severity: 'error',
            summary: 'Failed!',
            detail: 'Something went wrong!',
          });
          console.log('PASSWORD CHANGING:', 'Failed! Something went wrong!');
        },
      });
  }

  cancel(): void {
    this.ref.close();
  }
}
