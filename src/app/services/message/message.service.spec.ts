import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { Message } from 'src/app/models/message.model';
import { Subscription } from 'rxjs';

describe('MessageService', () => {

  let service: MessageService;
  let messageBox: Array<Message>;
  let subscription: Subscription;
  const messageStub = new Message('', '', '');

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(MessageService);
    messageBox = [];
  });

  afterEach(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('send() and fetchAll() method tests', () => {
    it('should be empty initially', () => {
      subscription = service.fetchAll().subscribe(data => messageBox = data);
      const size = messageBox.length;
      expect(size).toEqual(0);
    });

    it('should have one message after sending one message', () => {
      service.send(messageStub);
      subscription = service.fetchAll().subscribe(data => messageBox = data);
      const size = messageBox.length;
      expect(size).toEqual(1);
    });

    it('should have two messages after sending two messages', () => {
      service.send(messageStub);
      service.send(messageStub);
      subscription = service.fetchAll().subscribe(data => messageBox = data);
      const size = messageBox.length;
      expect(size).toEqual(2);
    });
  });

});
