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

  @Output() hasUserConfirmation: EventEmitter<boolean>;

  constructor() {
    this.hasUserConfirmation = new EventEmitter<boolean>();
  }

  accept(): void {
    this.hide();
    this.notifyUserChoice(true);
  }

  cancel(): void {
    this.hide();
    this.notifyUserChoice(false);
  }


  // lower abstraction or implementation details

  private hide(): void {
    this.isVisible = false;
  }

  private notifyUserChoice(userConfirmation: boolean): void {
    this.hasUserConfirmation.emit(userConfirmation);
  }

}
