import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface DialogInputData {
  header: string;
  message: string;
  acceptButtonLabel?: string;
  acceptSummary?: string;
  acceptDetail?: string;
  rejectButtonLabel?: string;
  rejectSummary?: string;
  rejectDetail?: string;
}

@Component({
  selector: 'app-confirmation-cancellation-dialog',
  standalone: true,
  imports: [ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './confirmation-cancellation-dialog.component.html',
  styleUrl: './confirmation-cancellation-dialog.component.scss',
})
export class ConfirmationCancellationDialogComponent implements OnInit {
  @Input('data') inputData!: DialogInputData;
  @Output('response') dialogResponse = new EventEmitter<boolean>();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.confirm();
  }

  confirm(): void {
    this.confirmationService.confirm({
      header: this.inputData.header ?? 'Are you sure?',
      message: this.inputData.message ?? 'Please confirm to proceed.',
      accept: () => {
        this.dialogResponse.emit(true);
        this.messageService.add({
          severity: 'info',
          summary: this.inputData.acceptSummary ?? 'Confirmed',
          detail: this.inputData.acceptDetail ?? 'You have accepted',
          life: 3000,
        });
      },
      reject: () => {
        this.dialogResponse.emit(false);
        this.messageService.add({
          severity: 'error',
          summary: this.inputData.rejectSummary ?? 'Rejected',
          detail: this.inputData.rejectDetail ?? 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
