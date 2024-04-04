import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { ChangePasswordDialogComponent } from 'src/app/shared/components/change-password-dialog/change-password-dialog.component';
import { User } from 'src/app/shared/interfaces/userInterfaces';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

interface InitialData {
  name: string;
  surname: string;
  email: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;
  isButtonDisabled: boolean = true;
  isEdit: boolean = false;
  isInitialDataChanged: boolean = false;
  ref: DynamicDialogRef | undefined;

  private initData: InitialData = {
    name: '',
    surname: '',
    email: '',
  };
  private destroy$: Subject<void> = new Subject();

  get name(): AbstractControl<string> {
    return this.profileForm.controls['name'];
  }

  get surname(): AbstractControl<string> {
    return this.profileForm.controls['surname'];
  }

  get email(): AbstractControl<string> {
    return this.profileForm.controls['email'];
  }

  constructor(
    private userServiceService: UserServiceService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogService: DialogService // private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.userServiceService
      .getCurrentUserInfo()
      .pipe(take(1))
      .subscribe((profileInfo: User) => {
        if (profileInfo) {
          const { name, surname, email } = profileInfo;
          this.initProfileForm(name, surname, email);
        }

        console.log('User Response: ', profileInfo);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initProfileForm(name: string, surname: string, email: string): void {
    this.profileForm = this.fb.group({
      name: new FormControl(
        { value: (this.initData.name = name ?? ''), disabled: true },
        { validators: Validators.required }
      ),
      surname: [
        {
          value: (this.initData.surname = surname ?? ''),
          disabled: true,
        },
        Validators.required,
      ],
      email: [
        {
          value: (this.initData.email = email ?? ''),
          disabled: true,
        },
        [Validators.required, Validators.email],
      ],
    });
  }

  private subscribeToFormValuesUpdate(): void {
    this.profileForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((values: InitialData) => {
        this.isInitialDataChanged =
          this.initData.name !== values.name ||
          this.initData.surname !== values.surname;
      });
  }

  private subscribeToFormStatusUpdate(): void {
    this.profileForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: FormControlStatus) => {
        this.isButtonDisabled = status === 'INVALID';
      });
  }

  submittingData() {
    const name = this.name.value === this.initData.name ? '' : this.name.value;
    const surname =
      this.surname.value === this.initData.surname ? '' : this.surname.value;

    this.userServiceService
      .updateUserProfile(name, surname)
      .pipe(take(1))
      .subscribe((response: User) => {
        this.initData = response;
        this.cancelEdit();
        console.log('USER PROFILE CHANGED: ', response);
      });
  }

  openChangePasswordDialog(): void {
    this.ref = this.dialogService.open(ChangePasswordDialogComponent, {
      header: 'Change the Password',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      styleClass: 'custom-dialog',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: { username: this.initData.email },
    });

    this.ref.onClose.pipe(take(1)).subscribe((data: any) => {
      if (data) {
        this.messageService.add({
          severity: data?.severity ?? 'info',
          summary: data?.summary ?? 'Not formatted data!',
          detail: data?.detail ?? '',
          life: 3000,
        });
      }
      console.log('DATA: ', data, ', no data');
    });
  }

  editProfile(): void {
    this.name.enable();
    this.surname.enable();
    this.profileForm.markAllAsTouched();
    this.subscribeToFormValuesUpdate();
    this.subscribeToFormStatusUpdate();
    this.isEdit = true;
    this.isButtonDisabled = false;
  }

  cancelEdit(): void {
    this.profileForm.reset({
      name: { value: this.initData.name, disabled: true },
      surname: { value: this.initData.surname, disabled: true },
      email: { value: this.initData.email, disabled: true },
    });
    this.isEdit = false;
    this.isButtonDisabled = true;
    this.destroy$.next();
  }
}
