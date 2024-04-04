import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss',
})
export class AdminProfileComponent {
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', Validators.required],
    });
  }

  get name() {
    return this.adminForm.controls['name'];
  }

  get surname() {
    return this.adminForm.controls['surname'];
  }

  submit() {
    console.log(this.adminForm.get('name')?.value);
    console.log(this.adminForm.get('surname')?.value);
    if (!this.adminForm.invalid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail:
          'Name: ' +
          this.adminForm.get('name')?.value +
          ', Surname: ' +
          this.adminForm.get('surname')?.value,
      });
    }
  }
}
