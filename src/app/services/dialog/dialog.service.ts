import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private isConfirmDialogVisible: boolean;
  private wasAccepted: ReplaySubject<boolean>;

  constructor() {
    this.hide();
  }


  isVisible(): boolean {
    return this.isConfirmDialogVisible;
  }

  sendUserChoice(userChoice: boolean) {
    this.hide();
    this.wasAccepted.next(userChoice);
    this.wasAccepted.complete();
  }

  confirm(): Observable<boolean> {
    this.show();
    this.wasAccepted = new ReplaySubject<boolean>();
    return this.wasAccepted;
  }


  private hide(): void {
    this.isConfirmDialogVisible = false;
  }

  private show(): void {
    this.isConfirmDialogVisible = true;
  }

}
