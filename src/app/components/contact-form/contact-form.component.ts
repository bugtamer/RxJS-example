import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  message: Message;
  messageForm: FormGroup;
  email:   FormControl;
  subject: FormControl;
  bodyMsg: FormControl;

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.reset();
    this.initForm();
  }

  onSubmit(): void {
    const email   = this.email.value;
    const subject = this.subject.value;
    const body    = this.bodyMsg.value;
    this.message = new Message(email, subject, body);
    this.messageService.send(this.message);
    this.reset();
    this.initForm();
    this.router.navigate(['/dashboard']);
  }

  fill(): void {
    this.email   = new FormControl('user@domain.com');
    this.subject = new FormControl('Topic');
    this.bodyMsg = new FormControl('It works!');
    this.initForm();
  }

  private reset(): void {
    const empty = '';
    this.email   = new FormControl(empty);
    this.subject = new FormControl(empty);
    this.bodyMsg = new FormControl(empty);
  }

  private initForm(): void {
    this.messageForm = new FormGroup({
      email:   this.email,
      subject: this.subject,
      message: this.bodyMsg
    });
  }

}
