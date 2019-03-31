import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  messageBox: Array<Message>;
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchData(): void {
    this.messageBox = [];
    this.subscription = this.messageService.fetchAll().subscribe(data => this.messageBox = data);
  }

}
