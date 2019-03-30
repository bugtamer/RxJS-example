import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() isVisible: boolean;

  @Output() wasAccepted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  accept(): void {
    this.hideModal();
    this.notifyUserChoice(true);
  }

  cancel(): void {
    this.hideModal();
    this.notifyUserChoice(false);
  }


  // lower abstraction or implementation details

  private hideModal(): void {
    this.isVisible = false;
  }

  private notifyUserChoice(userConfirmation: boolean): void {
    this.wasAccepted.emit(userConfirmation);
  }

}
