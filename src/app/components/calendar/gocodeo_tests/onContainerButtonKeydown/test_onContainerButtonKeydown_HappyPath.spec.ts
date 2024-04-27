import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../../../../app/components/calendar/calendar';
import {  ChevronLeftIcon  } from 'primeng/icons/chevronleft';
import {  Key  } from 'primeng/utils';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let incrementHourSpy: jasmine.Spy;
  let decrementHourSpy: jasmine.Spy;
  let toggleAMPMSpy: jasmine.Spy;
  let inputfieldViewChild: HTMLInputElement;
  let prevButton: HTMLButtonElement;
  let monthButton: HTMLButtonElement;
  let todayButton: HTMLButtonElement;
  let ampmButton: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, ChevronLeftIcon],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    incrementHourSpy = spyOn(component, 'incrementHour');
    decrementHourSpy = spyOn(component, 'decrementHour');
    toggleAMPMSpy = spyOn(component, 'toggleAMPM');

    inputfieldViewChild = fixture.debugElement.query(By.css('input')).nativeElement;
    prevButton = fixture.debugElement.query(By.css('.p-datepicker-prev')).nativeElement;
    monthButton = fixture.debugElement.query(By.css('.p-datepicker-month')).nativeElement;
    todayButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    ampmButton = fixture.debugElement.query(By.css('.p-link[aria-label="getTranslation(\'am\')"]')).nativeElement;
  });

  it('should navigate to previous month when clicking on the previous month button', () => {
    spyOn(component, 'onPrevButtonClick');

    prevButton.click();

    expect(component.onPrevButtonClick).toHaveBeenCalled();
    expect(component.getViewDate().getMonth()).toBe(component.month.month - 1);
  });

  it('should switch to month view when clicking on the button with month name', () => {
    spyOn(component, 'switchToMonthView');

    monthButton.click();

    expect(component.switchToMonthView).toHaveBeenCalled();
    expect(component.currentView).toBe('month');
  });

  it('should increment hour value when pressing up arrow key in hour input field', () => {
    const initialHourValue = component.hour;
    const upArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });

    component.incrementHour(upArrowEvent);

    expect(incrementHourSpy).toHaveBeenCalled();
    expect(component.hour).toBe(initialHourValue + 1);
  });

  it('should decrement hour value when pressing down arrow key in hour input field', () => {
    const initialHourValue = component.hour;
    const downArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });

    component.decrementHour(downArrowEvent);

    expect(decrementHourSpy).toHaveBeenCalled();
    expect(component.hour).toBe(initialHourValue - 1);
  });

  it('should toggle between AM and PM when clicking on the toggle AM/PM button', () => {
    component.hour = 11;

    ampmButton.click();

    expect(toggleAMPMSpy).toHaveBeenCalled();
    expect(component.hour).toBe(23);
  });

  it('should update date picker to display current date when clicking on Today button', () => {
    spyOn(component, 'onTodayButtonClick');

    todayButton.click();

    expect(component.onTodayButtonClick).toHaveBeenCalled();
    expect(component.date.getDate()).toBe(new Date().getDate());
  });

  it('should focus input field and close date picker overlay when pressing Escape key', () => {
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });

    spyOn(component.inputfieldViewChild, 'focus');
    spyOn(component, 'onContainerButtonKeydown').and.callThrough();

    component.onContainerButtonKeydown(escapeEvent);

    expect(component.inputfieldViewChild.focus).toHaveBeenCalled();
    expect(component.overlayVisible).toBe(false);
  });

  it('should trap focus within the datepicker when tabbing through the header elements', () => {
    const headerElements = DomHandler.findSingle(component.containerViewChild?.nativeElement, '.p-datepicker-header');
    const lastElement = headerElements.children[headerElements.children.length - 1];
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    tabEvent.shiftKey = false;

    spyOn(component, 'trapFocus');

    component.onContainerButtonKeydown(tabEvent);

    expect(component.trapFocus).toHaveBeenCalled();
  });

  it('should prevent tabbing out of the datepicker when inline', () => {
    fixture.componentInstance.inline = true;
    fixture.detectChanges();

    const headerElements = DomHandler.findSingle(component.containerViewChild?.nativeElement, '.p-datepicker-header');
    const lastElement = headerElements.children[headerElements.children.length - 1];
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    tabEvent.shiftKey = false;

    spyOn(component, 'trapFocus');

    component.onContainerButtonKeydown(tabEvent);

    expect(component.trapFocus).not.toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});