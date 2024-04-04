import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCancellationDialogComponent } from './confirmation-cancellation-dialog.component';

describe('ConfirmationCancellationDialogComponent', () => {
  let component: ConfirmationCancellationDialogComponent;
  let fixture: ComponentFixture<ConfirmationCancellationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationCancellationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationCancellationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
