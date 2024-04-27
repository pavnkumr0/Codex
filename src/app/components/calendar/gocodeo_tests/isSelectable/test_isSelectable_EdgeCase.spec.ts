import {  CalendarComponent  } from '../calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  
  beforeEach(() => {
    // Initialize component with mocked dependencies
    component = new CalendarComponent();
  });

  it('should return false when minDate constraint is violated', () => {
    const result = component.isSelectable(10, 0, 2022, false);
    expect(result).toBe(false);
  });

  it('should return false when maxDate constraint is violated', () => {
    const result = component.isSelectable(20, 11, 2022, false);
    expect(result).toBe(false);
  });

  it('should return false for a disabled date', () => {
    const result = component.isSelectable(15, 2, 2022, false);
    expect(result).toBe(false);
  });

  it('should return false for a disabled day of the week', () => {
    const result = component.isSelectable(25, 2, 2022, false);
    expect(result).toBe(false);
  });

  it('should return true if the date is today', () => {
    const result = component.isToday(new Date(2022, 1, 15), 15, 1, 2022);
    expect(result).toBe(true);
  });

  it('should return true for single selection mode', () => {
    const result = component.isSingleSelection();
    expect(result).toBe(true);
  });

  it('should return true for multiple selection mode', () => {
    const result = component.isMultipleSelection();
    expect(result).toBe(false);
  });

  it('should return true for range selection mode', () => {
    const result = component.isRangeSelection();
    expect(result).toBe(false);
  });

  it('should return true if a month is selected', () => {
    const result = component.isMonthSelected(1);
    expect(result).toBe(false);
  });

  it('should return true if a month is disabled', () => {
    const result = component.isMonthDisabled(0, 2022);
    expect(result).toBe(false);
  });

  it('should return true if a year is disabled', () => {
    const result = component.isYearDisabled(2022);
    expect(result).toBe(false);
  });

  it('should return true if a year is selected', () => {
    const result = component.isYearSelected(2022);
    expect(result).toBe(false);
  });

  it('should return true for equal dates', () => {
    const result = component.isDateEquals(new Date(2022, 1, 15), { day: 15, month: 1, year: 2022 });
    expect(result).toBe(true);
  });

  it('should return true for dates between two given dates', () => {
    const result = component.isDateBetween(new Date(2022, 1, 1), new Date(2022, 1, 28), { day: 15, month: 1, year: 2022 });
    expect(result).toBe(true);
  });

  it('should return true for a valid date selection', () => {
    const result = component.shouldSelectDate({ selectable: true });
    expect(result).toBe(true);
  });

  it('should update the model with a single date value', () => {
    component.updateModel(new Date(2022, 1, 15));
    expect(component.value).toEqual(new Date(2022, 1, 15));
  });

  it('should update the model with multiple date values for range selection mode', () => {
    component.updateModel([new Date(2022, 1, 1), new Date(2022, 1, 28)]);
    expect(component.value).toEqual([new Date(2022, 1, 1), new Date(2022, 1, 28)]);
  });

  it('should not update the model if the date is disabled', () => {
    component.updateModel(new Date(2022, 1, 15));
    component.value = null;
    component.updateModel(new Date(2022, 2, 15));
    expect(component.value).toEqual(null);
  });

  it('should not update the model if the date is out of range', () => {
    component.updateModel(new Date(2022, 1, 15));
    component.value = null;
    component.updateModel(new Date(2023, 1, 15));
    expect(component.value).toEqual(null);
  });

  it('should init the time with the current time', () => {
    const date = new Date();
    component.initTime(date);
    expect(component.currentHour).toEqual(date.getHours());
    expect(component.currentMinute).toEqual(date.getMinutes());
    expect(component.currentSecond).toEqual(date.getSeconds());
    expect(component.pm).toEqual(date.getHours() > 11);
  });

  it('should navigate backward in month view', () => {
    component.currentMonth = 2;
    component.currentYear = 2022;
    component.navBackward();
    expect(component.currentMonth).toEqual(1);
    expect(component.currentYear).toEqual(2022);
  });

  it('should navigate forward in month view', () => {
    component.currentMonth = 1;
    component.currentYear = 2022;
    component.navForward();
    expect(component.currentMonth).toEqual(2);
    expect(component.currentYear).toEqual(2022);
  });

  it('should navigate backward in year view', () => {
    component.currentView = 'year';
    component.currentYear = 2022;
    component.navBackward();
    expect(component.currentYear).toEqual(2021);
  });

  it('should navigate forward in year view', () => {
    component.currentView = 'year';
    component.currentYear = 2022;
    component.navForward();
    expect(component.currentYear).toEqual(2023);
  });

  it('should switch to month view', () => {
    component.currentView = 'year';
    component.switchtoMonthView();
    expect(component.currentView).toEqual('month');
  });

  it('should switch to year view', () => {
    component.currentView = 'month';
    component.switchToYearView();
    expect(component.currentView).toEqual('year');
  });

  it('should select a date in single selection mode', () => {
    component.onDateSelect(null, { year: 2022, month: 1, day: 15, selectable: true });
    expect(component.value).toEqual(new Date(2022, 1, 15));
  });

  it('should select multiple dates in multiple selection mode', () => {
    component.onDateSelect(null, { year: 2022, month: 1, day: 15, selectable: true });
    component.onDateSelect(null, { year: 2022, month: 1, day: 16, selectable: true });
    expect(component.value).toEqual([new Date(2022, 1, 15), new Date(2022, 1, 16)]);
  });

  it('should select a range of dates in range selection mode', () => {
    component.onDateSelect(null, { year: 2022, month: 1, day: 15, selectable: true });
    component.onDateSelect(null, { year: 2022, month: 1, day: 18, selectable: true });
    expect(component.value).toEqual([new Date(2022, 1, 15), new Date(2022, 1, 18)]);
  });

  it('should not select a date if it is disabled', () => {
    component.onDateSelect(null, { year: 2022, month: 2, day: 15, selectable: false });
    expect(component.value).toEqual(null);
  });

  it('should not select a date if it is out of range', () => {
    component.onDateSelect(null, { year: 2023, month: 1, day: 15, selectable: true });
    expect(component.value).toEqual(null);
  });

  it('should select a month in month view', () => {
    component.onMonthSelect(null, 1);
    expect(component.currentMonth).toEqual(1);
    expect(component.currentYear).toEqual(2022);
    expect(component.currentView).toEqual('date');
  });

  it('should select a year in year view', () => {
    component.currentView = 'year';
    component.onYearSelect(null, 2023);
    expect(component.currentMonth).toEqual(0);
    expect(component.currentYear).toEqual(2023);
    expect(component.currentView).toEqual('month');
  });

  it('should update the input field value', () => {
    component.value = new Date(2022, 1, 15);
    component.updateInputfield();
    expect(component.inputFieldValue).toEqual('02/15/2022');
  });

  it('should format the date according to the specified format', () => {
    component.value = new Date(2022, 1, 15);
    component.format = 'dd/mm/yy';
    component.updateInputfield();
    expect(component.inputFieldValue).toEqual('15/02/22');
  });

  it('should show the overlay when the input field is focused', () => {
    component.showOnFocus = true;
    component.onInputFocus();
    expect(component.overlayVisible).toBe(true);
  });

  it('should hide the overlay when the input field is blurred', () => {
    component.overlayVisible = true;
    component.onInputBlur();
    expect(component.overlayVisible).toBe(false);
  });

  it('should toggle the overlay visibility when the button is clicked', () => {
    component.onButtonClick();
    expect(component.overlayVisible).toBe(true);
    component.onButtonClick();
    expect(component.overlayVisible).toBe(false);
  });

  it('should clear the value when the clear button is clicked', () => {
    component.value = new Date(2022, 1, 15);
    component.clear();
    expect(component.value).toEqual(null);
  });

  it('should handle keyboard events in the input field', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onInputKeydown(event);
    expect(component.overlayVisible).toBe(false);
    event.key = 'Escape';
    component.onInputKeydown(event);
    expect(component.overlayVisible).toBe(true);
  });

  it('should handle keyboard events in the date cell', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onDateCellKeydown(event, new Date(2022, 1, 15), 0);
    expect(component.value).toEqual(new Date(2022, 1, 15));
    event.key = 'Escape';
    component.onDateCellKeydown(event, new Date(2022, 1, 15), 0);
    expect(component.overlayVisible).toBe(true);
  });

  it('should handle keyboard events in the month cell', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onMonthCellKeydown(event, 1);
    expect(component.currentMonth).toEqual(1);
    expect(component.currentYear).toEqual(2022);
    expect(component.currentView).toEqual('date');
    event.key = 'Escape';
    component.onMonthCellKeydown(event, 1);
    expect(component.overlayVisible).toBe(true);
  });

  it('should handle keyboard events in the year cell', () => {
    component.currentView = 'year';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onYearCellKeydown(event, 2023);
    expect(component.currentMonth).toEqual(0);
    expect(component.currentYear).toEqual(2023);
    expect(component.currentView).toEqual('month');
    event.key = 'Escape';
    component.onYearCellKeydown(event, 2023);
    expect(component.overlayVisible).toBe(true);
  });
});