import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent implements OnInit {
  adminForm!: FormGroup;
  isButtonDisabled: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  get name() {
    return this.adminForm.controls['name'];
  }

  get surname() {
    return this.adminForm.controls['surname'];
  }

  submittingData(): void {}
}
