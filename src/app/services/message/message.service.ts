import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { Observable, of, ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageBox: Array<Message>;

  constructor() {
    this.messageBox = [];
  }

  send(message: Message): void {
    this.messageBox.push(message);
  }

  fetchAll(): Observable<Array<Message>> {
    return of(this.messageBox);
  }

}
