import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should not render button with ChevronLeftIcon when i is not equal to 0', () => {
    component.i = 1;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-datepicker-prev-icon'));
    expect(button).toBeNull();
  });

  it('should not render button with class p-datepicker-month when currentView is not "date"', () => {
    component.currentView = 'month';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(button).toBeNull();
  });

  it('should not pass event object to switchToMonthView function', () => {
    spyOn(component, 'switchToMonthView');
    const button = fixture.debugElement.query(By.css('.p-datepicker-month'));
    button.triggerEventHandler('click', {});
    expect(component.switchToMonthView).toHaveBeenCalled();
    expect(component.switchToMonthView).toHaveBeenCalledWith();
  });

  it('should not pass event object to incrementHour function', () => {
    spyOn(component, 'incrementHour');
    const button = fixture.debugElement.query(By.css('.p-datepicker-next'));
    button.triggerEventHandler('keydown', {});
    expect(component.incrementHour).toHaveBeenCalled();
    expect(component.incrementHour).toHaveBeenCalledWith();
  });

  it('should not pass event object to toggleAMPM function', () => {
    spyOn(component, 'toggleAMPM');
    const button = fixture.debugElement.query(By.css('.p-link'));
    button.triggerEventHandler('click', {});
    expect(component.toggleAMPM).toHaveBeenCalled();
    expect(component.toggleAMPM).toHaveBeenCalledWith();
  });

  it('should not pass event object to onTodayButtonClick function', () => {
    spyOn(component, 'onTodayButtonClick');
    const button = fixture.debugElement.query(By.css('[label="Today"]'));
    button.triggerEventHandler('click', {});
    expect(component.onTodayButtonClick).toHaveBeenCalled();
    expect(component.onTodayButtonClick).toHaveBeenCalledWith();
  });

  it('should not pass event object to onClearButtonClick function', () => {
    spyOn(component, 'onClearButtonClick');
    const button = fixture.debugElement.query(By.css('[label="Clear"]'));
    button.triggerEventHandler('click', {});
    expect(component.onClearButtonClick).toHaveBeenCalled();
    expect(component.onClearButtonClick).toHaveBeenCalledWith();
  });

  it('should keep input field focused and overlayVisible true when Escape key pressed', () => {
    const inputField = document.createElement('input');
    component.inputfieldViewChild = { nativeElement: inputField };
    const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    spyOn(escapeKeyEvent, 'preventDefault')
    inputField.dispatchEvent(escapeKeyEvent);
    expect(component.overlayVisible).toBeTruthy();
    expect(escapeKeyEvent.preventDefault).toHaveBeenCalled();
  });

  it('should not call incrementHour when key is not enter', () => {
    const inputField = document.createElement('input');
    component.inputfieldViewChild = { nativeElement: inputField };
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'a' });
    spyOn(escapeKeyEvent, 'preventDefault')
    inputField.dispatchEvent(enterKeyEvent);
    expect(component.incrementHour).not.toHaveBeenCalled();
  });

  it('should not call decrementHour when key is not enter', () => {
    const inputField = document.createElement('input');
    component.inputfieldViewChild = { nativeElement: inputField };
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'b' });
    spyOn(escapeKeyEvent, 'preventDefault')
    inputField.dispatchEvent(enterKeyEvent);
    expect(component.decrementHour).not.toHaveBeenCalled();
  });

  it('should not call incrementMinute when key is not enter', () => {
    const inputField = document.createElement('input');
    component.inputfieldViewChild = { nativeElement: inputField };
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'c' });
    spyOn(escapeKeyEvent, 'preventDefault')
    inputField.dispatchEvent(enterKeyEvent);
    expect(component.incrementMinute).not.toHaveBeenCalled();
  });

  it('should not call decrementMinute when key is not enter', () => {
    const inputField = document.createElement('input');
    component.inputfieldViewChild = { nativeElement: inputField };
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'd' });
    spyOn(escapeKeyEvent, 'preventDefault')
    inputField.dispatchEvent(enterKeyEvent);
    expect(component.decrementMinute).not.toHaveBeenCalled();
  });

  it('should not call incrementSecond when key is not enter', () => {
    const inputField = document.createElement('input');
    component.inputfieldViewChild = { nativeElement: inputField };
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'e' });
    spyOn(escapeKeyEvent, 'preventDefault')
    inputField.dispatchEvent(enterKeyEvent);
    expect(component.incrementSecond).not.toHaveBeenCalled();
  });

  it('should not call decrementSecond when key is not enter', () => {
    const inputField = document.createElement('input');
    component.inputfieldViewChild = { nativeElement: inputField };
    const enterKeyEvent = new KeyboardEvent('keydown', { key: 'f' });
    spyOn(escapeKeyEvent, 'preventDefault')
    inputField.dispatchEvent(enterKeyEvent);
    expect(component.decrementSecond).not.toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});