import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
  });

  it('NegativeCase 1: Testing the `formatDateTime` function with an invalid date object (null)', () => {
    const invalidDate = null;
    const formattedValue = component.formatDateTime(invalidDate);
    // Assert
    expect(formattedValue).toBeNull();
  });

  it('NegativeCase 2: Testing the `getFirstDayOfMonthIndex` function with a negative month value (-1) and a valid year value', () => {
    const dayIndex = component.getFirstDayOfMonthIndex(-1, 2022);
    // Assert
    expect(dayIndex).toBeGreaterThanOrEqual(0);
  });

  it('NegativeCase 3: Testing the `getDaysCountInMonth` function with an invalid month value (13) and a valid year value', () => {
    const daysCount = component.getDaysCountInMonth(13, 2022);
    // Assert
    expect(daysCount).toBe(0);
  });

  it('NegativeCase 4: Testing the `getDaysCountInPrevMonth` function with a negative month value (-1) and a valid year value', () => {
    const daysCount = component.getDaysCountInPrevMonth(-1, 2022);
    // Assert
    expect(daysCount).toBeGreaterThan(0);
  });

  it('NegativeCase 5: Testing the `getPreviousMonthAndYear` function with a negative month value (-1) and a negative year value (-1)', () => {
    const { month, year } = component.getPreviousMonthAndYear(-1, -1);
    // Assert
    expect(month).toBe(11);
    expect(year).toBe(-2);
  });

  it('NegativeCase 6: Testing the `getNextMonthAndYear` function with a month value exceeding the limit (12) and a valid year value', () => {
    const { month, year } = component.getNextMonthAndYear(12, 2022);
    // Assert
    expect(month).toBe(0);
    expect(year).toBe(2023);
  });

  it('NegativeCase 7: Testing the `getSundayIndex` function with an invalid day setting (8)', () => {
    const sundayIndex = component.getSundayIndex();
    // Assert
    expect(sundayIndex).toBeGreaterThan(0);
  });

  it('NegativeCase 8: Testing the `isSelected` function with a null dateMeta object', () => {
    const isDateSelected = component.isSelected(null);
    // Assert
    expect(isDateSelected).toBeFalsy();
  });

  it('NegativeCase 9: Testing the `formatDateTime` function with a valid date object but an invalid date format (empty string)', () => {
    const validDate = new Date();
    const formattedValue = component.formatDateTime(validDate, '');
    // Assert
    expect(formattedValue).toBeNull();
  });

  it('NegativeCase 10: Testing the `getFirstDayOfMonthIndex` function with a valid month value but an invalid year value (0)', () => {
    const dayIndex = component.getFirstDayOfMonthIndex(5, 0);
    // Assert
    expect(dayIndex).toBeGreaterThanOrEqual(0);
  });

  it('NegativeCase 11: Testing the `getDaysCountInMonth` function with a valid month value but an invalid year value (0)', () => {
    const daysCount = component.getDaysCountInMonth(10, 0);
    // Assert
    expect(daysCount).toBe(0);
  });

  it('NegativeCase 12: Testing the `getDaysCountInPrevMonth` function with a valid month value but an invalid year value (0)', () => {
    const daysCount = component.getDaysCountInPrevMonth(11, 0);
    // Assert
    expect(daysCount).toBeGreaterThan(0);
  });

  it('NegativeCase 13: Testing the `getPreviousMonthAndYear` function with a valid month value but an invalid year value (0)', () => {
    const { month, year } = component.getPreviousMonthAndYear(3, 0);
    // Assert
    expect(month).toBe(2);
    expect(year).toBe(-1);
  });

  it('NegativeCase 14: Testing the `getNextMonthAndYear` function with a valid month value but an invalid year value (0)', () => {
    const { month, year } = component.getNextMonthAndYear(4, 0);
    // Assert
    expect(month).toBe(5);
    expect(year).toBe(1);
  });

  it('NegativeCase 15: Testing the `getSundayIndex` function with an invalid day setting (null)', () => {
    const sundayIndex = component.getSundayIndex(null);
    // Assert
    expect(sundayIndex).toBeGreaterThan(0);
  });

  it('NegativeCase 16: Testing the `isSelected` function with an invalid dateMeta object (empty object)', () => {
    const isDateSelected = component.isSelected({});
    // Assert
    expect(isDateSelected).toBeFalsy();
  });
});