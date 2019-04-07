import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message/message.service';
import { Router } from '@angular/router';
import { PendingChangesGuarded } from 'src/app/guards/pending-changes.guard';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, PendingChangesGuarded {

  messageForm: FormGroup;
  email:   FormControl;
  subject: FormControl;
  bodyMsg: FormControl;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit(): void {
    this.messageService.send(this.parseForm());
    this.reset();
    this.router.navigate(['/dashboard']);
  }

  fill(): void {
    this.email.setValue('user@domain.com');
    this.subject.setValue('Topic');
    this.bodyMsg.setValue('It works!');
  }

  isVisible(): boolean {
    return this.dialogService.isVisible();
  }

  notifyUserChoice(userConfirmation: boolean): void {
    this.dialogService.sendUserChoice(userConfirmation);
  }

  arePendingChanges(): boolean {
    return this.isFilled(this.email)
        || this.isFilled(this.subject)
        || this.isFilled(this.bodyMsg);
  }


  // lower abstraction details

  private isFilled(input: FormControl): boolean {
    return input.value ? input.value.length > 0 : false;
  }

  private parseForm(): Message {
    const email   = this.email.value;
    const subject = this.subject.value;
    const body    = this.bodyMsg.value;
    return new Message(email, subject, body);
  }

  private reset(): void {
    this.messageForm.reset();
  }

  private initForm(): void {
    this.email   = new FormControl();
    this.subject = new FormControl();
    this.bodyMsg = new FormControl();
    this.messageForm = new FormGroup({
      email:   this.email,
      subject: this.subject,
      message: this.bodyMsg
    });
  }

}
