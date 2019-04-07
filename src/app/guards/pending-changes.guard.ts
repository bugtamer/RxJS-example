import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { DialogService } from '../services/dialog/dialog.service';

export interface PendingChangesGuarded {

  arePendingChanges(): boolean;

}


@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<PendingChangesGuarded> {

  constructor(private dialog: DialogService) { }

  canDeactivate(component: PendingChangesGuarded): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAllowedToLeave(component);
  }

  private isAllowedToLeave(component: PendingChangesGuarded): Observable<boolean> | boolean {
    const noPendingChanges = this.hasNotPendingChanges(component);
    if (noPendingChanges) {
      return noPendingChanges;
    }
    const goAhead = this.hasUserGoAheadToLeaveWithoutSaving();
    return combineLatest(of(noPendingChanges), goAhead, (x, y) => x || y); // FIXME combineLatest is deprecated
  }

  private hasNotPendingChanges(component: PendingChangesGuarded): boolean {
    return component.arePendingChanges() === false;
  }

  private hasUserGoAheadToLeaveWithoutSaving(): Observable<boolean> {
    return this.dialog.confirm();
  }

}
