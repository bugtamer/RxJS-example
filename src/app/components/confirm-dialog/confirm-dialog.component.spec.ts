import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {

  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let rootElement: DebugElement;

  let emitterSpy: jasmine.Spy;

  let confirmDialog:    HTMLElement;
  let titleHeader:      HTMLHeadingElement;
  let messageParagraph: HTMLParagraphElement;
  let acceptButton:     HTMLButtonElement;
  let cancelButton:     HTMLButtonElement;

  const title = 'Warning about data lost';
  const message = 'Do you want to leave without saving the pending changes?';
  const visible = true;
  const hidden = false;
  const acceptButtonLabel = 'Accept';
  const cancelButtonLabel = 'Cancel';


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.title = title;
    component.message = message;
    component.isVisible = visible;
    fixture.detectChanges();
    rootElement = fixture.debugElement;

    confirmDialog = rootElement.nativeElement.querySelector('.modal-panel');
    titleHeader = rootElement.nativeElement.querySelector('.title');
    messageParagraph = rootElement.nativeElement.querySelector('.message');
    acceptButton = rootElement.nativeElement.querySelector('.accept');
    cancelButton = rootElement.nativeElement.querySelector('.cancel');
    emitterSpy = spyOn(component.wasAccepted, 'emit');
  });


  afterEach(() => {
    component.isVisible = false;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('behavior specs', () => {
    it('should be unaccessible when isVisible input is false', () => {
      component.isVisible = hidden;
      fixture.detectChanges();
      confirmDialog = rootElement.nativeElement.querySelector('aside');
      expect(confirmDialog).toBeNull();
    });
  });


  describe('modal appearance when isVisible input is true', () => {
    it('should be accessible', () => {
      expect(confirmDialog).toBeTruthy();
    });

    it('should has a title', () => {
      expect(titleHeader.textContent).toEqual(title);
    });

    it('should has a message', () => {
      expect(messageParagraph.textContent).toEqual(message);
    });

    it('should has a accept button', () => {
      expect(acceptButton.innerText).toEqual(acceptButtonLabel);
    });

    it('should has a cancel button', () => {
      expect(cancelButton.innerText).toEqual(cancelButtonLabel);
    });
  });


  describe('user choice notification specs', () => {
    it('should emit true when accept button is clicked', () => {
      acceptButton.click();
      expect(emitterSpy).toHaveBeenCalledWith(true);
    });

    it('should emit false when cancel button is clicked', () => {
      cancelButton.dispatchEvent(new Event('click'));
      expect(component.wasAccepted.emit).toHaveBeenCalledWith(false);
    });
  });

});
