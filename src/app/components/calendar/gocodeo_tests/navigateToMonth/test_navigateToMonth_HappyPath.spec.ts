import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  it('should navigate to previous month on left arrow key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', keyCode: 37 });
    const navigateToMonthSpy = spyOn(component, 'navigateToMonth');
    component.onKeyDown(event);
    expect(navigateToMonthSpy).toHaveBeenCalledWith(true, component.groupIndex);
  });

  it('should navigate to next month on right arrow key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39 });
    const navigateToMonthSpy = spyOn(component, 'navigateToMonth');
    component.onKeyDown(event);
    expect(navigateToMonthSpy).toHaveBeenCalledWith(false, component.groupIndex);
  });

  it('should handle date selection on enter key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });
    const onDateSelectSpy = spyOn(component, 'onDateSelect');
    component.onKeyDown(event);
    expect(onDateSelectSpy).toHaveBeenCalled();
  });

  it('should handle date selection on space key press', () => {
    const event = new KeyboardEvent('keydown', { key: ' ', keyCode: 32 });
    const onDateSelectSpy = spyOn(component, 'onDateSelect');
    component.onKeyDown(event);
    expect(onDateSelectSpy).toHaveBeenCalled();
  });

  it('should focus on input field and hide overlay on escape key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 });
    spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    component.onKeyDown(event);
    expect(component.inputfieldViewChild.nativeElement.focus).toHaveBeenCalled();
    expect(component.overlayVisible).toBe(false);
  });

  it('should navigate between cells on tab key press based on focus and group index', () => {
    const event = new KeyboardEvent('keydown', { key: 'Tab', keyCode: 9 });
    const navigateToMonthSpy = spyOn(component, 'navigateToMonth');
    component.numberOfMonths = 3; // Assuming there are 3 months displayed
    component.groupIndex = 1; // Assuming current group index is 1
    component.onKeyDown(event);

    // Assertions based on current groupIndex and numberOfMonths
    expect(navigateToMonthSpy).toHaveBeenCalledWith(true, 1); // Navigating backwards

    // Tabbing to the next cell in the current month
    event.shiftKey = false; // Shift key is not pressed
    component.onKeyDown(event);
    const cellContent = component.contentViewChild.nativeElement.querySelector('.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
    expect(cellContent.tabIndex).toBe('0');
    expect(cellContent).toBe(document.activeElement);

    // Tabbing to the next month when reaching the last cell of the current month
    event.shiftKey = true; // Shift key is pressed
    component.onKeyDown(event);
    const nextMonthCell = component.contentViewChild.nativeElement.querySelector('.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
    expect(nextMonthCell.tabIndex).toBe('0');
    expect(nextMonthCell).toBe(document.activeElement);
  });
});