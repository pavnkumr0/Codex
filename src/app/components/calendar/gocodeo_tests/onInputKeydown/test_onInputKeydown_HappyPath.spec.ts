import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  TimesIcon  } from 'primeng/icons/times';
import {  CalendarIcon  } from 'primeng/icons/calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, TimesIcon, CalendarIcon]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call onInputClick method when input field is clicked', () => {
    spyOn(component, 'onInputClick');
    const inputField = fixture.nativeElement.querySelector('input');
    inputField.click();
    expect(component.onInputClick).toHaveBeenCalled();
  });

  it('should call onUserInput method when user inputs text into the input field', () => {
    spyOn(component, 'onUserInput');
    const inputField = fixture.nativeElement.querySelector('input');
    inputField.dispatchEvent(new Event('input'));
    expect(component.onUserInput).toHaveBeenCalled();
  });

  it('should call onInputKeydown method when user presses a key while the input field is focused', () => {
    spyOn(component, 'onInputKeydown');
    const inputField = fixture.nativeElement.querySelector('input');
    inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.onInputKeydown).toHaveBeenCalled();
  });

  it('should call onInputBlur method when input field loses focus', () => {
    spyOn(component, 'onInputBlur');
    const inputField = fixture.nativeElement.querySelector('input');
    inputField.blur();
    expect(component.onInputBlur).toHaveBeenCalled();
  });

  it('should not trigger any action when interacting with a disabled input field', () => {
    spyOn(component, 'onInputClick');
    const inputField = fixture.nativeElement.querySelector('input');
    component.disabled = true;
    inputField.click();
    expect(component.onInputClick).not.toHaveBeenCalled();
  });

  it('should toggle placeholder text display on focus and blur events', () => {
    const inputField = fixture.nativeElement.querySelector('input');
    const placeholder = 'Enter value';
    component.placeholder = placeholder;

    inputField.focus();
    expect(inputField.placeholder).toBe('');

    inputField.blur();
    expect(inputField.placeholder).toBe(placeholder);
  });

  it('should clear the input field when the clear button is clicked', () => {
    spyOn(component, 'clear');
    const clearButton = fixture.nativeElement.querySelector('.p-calendar-clear-icon');
    clearButton.click();
    expect(component.clear).toHaveBeenCalled();
  });

  it('should show and hide the calendar overlay when the input field is clicked', () => {
    const inputField = fixture.nativeElement.querySelector('input');
    inputField.click();
    expect(component.overlayVisible).toBeTruthy();

    inputField.blur();
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should show and hide the calendar overlay when the calendar icon is clicked', () => {
    const calendarIcon = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    calendarIcon.click();
    expect(component.overlayVisible).toBeTruthy();

    calendarIcon.blur();
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should select a date when a date is clicked on the calendar', () => {
    const calendarIcon = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    calendarIcon.click();

    const dateCell = fixture.nativeElement.querySelector('.p-datepicker-calendar-cell-content');
    dateCell.click();

    expect(component.value).toEqual(new Date());
  });

  it('should not select a date when a disabled date is clicked on the calendar', () => {
    const calendarIcon = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    calendarIcon.click();

    const disabledDateCell = fixture.nativeElement.querySelector('.p-datepicker-calendar-cell-disabled');
    disabledDateCell.click();

    expect(component.value).toBeNull();
  });

  it('should close the calendar overlay when the escape key is pressed', () => {
    const calendarIcon = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    calendarIcon.click();

    const inputField = fixture.nativeElement.querySelector('input');
    inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(component.overlayVisible).toBeFalsy();
  });

  it('should close the calendar overlay when the tab key is pressed', () => {
    const calendarIcon = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    calendarIcon.click();

    const inputField = fixture.nativeElement.querySelector('input');
    inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

    expect(component.overlayVisible).toBeFalsy();
  });

  it('should trap focus within the calendar overlay when the arrow down key is pressed', () => {
    const calendarIcon = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    calendarIcon.click();

    const inputField = fixture.nativeElement.querySelector('input');
    inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.p-datepicker-calendar-cell-content'));
  });
});