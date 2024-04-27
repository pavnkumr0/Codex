import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
  });

  let component: CalendarComponent;

  beforeEach(() => {
    component = TestBed.inject(CalendarComponent);
  });

  it('NegativeCase 1: should throw an error when input date is null in initTime function', () => {
    expect(() => {
      component.initTime(null);
    }).toThrowError('Cannot read properties of null (reading \'getHours\')');
  });

  it('NegativeCase 2: should not navigate backward if current view is not month or year', () => {
    const event = { preventDefault: jasmine.createSpy() };
    component.currentView = 'date';

    component.navBackward(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('NegativeCase 3: should not update selection if date is non-selectable in onDateSelect function', () => {
    const event = { preventDefault: jasmine.createSpy() };
    const dateMeta = { selectable: false };

    component.onDateSelect(event, dateMeta);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.value).toBeNull();
  });

  it('NegativeCase 4: should handle out-of-bounds error when index is greater than 11 in onMonthSelect function', () => {
    const event = { preventDefault: jasmine.createSpy() };
    const index = 12;

    component.onMonthSelect(event, index);

    expect(component.currentMonth).not.toBe(12); // Check if month is not set to 12
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('NegativeCase 5: should not decrement year if already at minimum value in decrementYear function', () => {
    component.currentYear = 1900; // Assuming minimum year is 1900

    component.decrementYear();

    expect(component.currentYear).toBe(1900); // Year should remain the same
  });

  it('NegativeCase 6: should prevent default event when switching to month view in switchToMonthView function', () => {
    const event = { preventDefault: jasmine.createSpy() };

    component.switchToMonthView(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('NegativeCase 7: should not update input field if no dates are selected in updateInputfield function', () => {
    component.value = null; // No selected dates

    component.updateInputfield();

    expect(component.formattedValue).toBe(''); // Formatted value should be empty
  });

  it('NegativeCase 8: should not select date if shouldSelectDate returns false for a selectable date in onDateSelect function', () => {
    const event = { preventDefault: jasmine.createSpy() };
    const dateMeta = { selectable: true };

    spyOn(component, 'shouldSelectDate').and.returnValue(false);

    component.onDateSelect(event, dateMeta);

    expect(component.value).toBeNull(); // Value should remain null
    expect(event.preventDefault).toHaveBeenCalled();
  });

});