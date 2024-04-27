import {  CalendarComponent  } from '../calendar.component';
import {  fakeAsync, flush, tick  } from '@angular/core/testing';

describe('Calendar Component Unit Tests', () => {

  let calendarComponent: CalendarComponent;

  beforeEach(() => {
    calendarComponent = new CalendarComponent();
  });

  it('should return -1 when date parameter passed to getWeekNumber function is null', () => {
    const result = calendarComponent.getWeekNumber(null);
    expect(result).toEqual(-1);
  });

  it('should throw an error if startWeekFromFirstDayOfYear is not a boolean', () => {
    expect(() => {
      calendarComponent.startWeekFromFirstDayOfYear = 'true';
      calendarComponent.getWeekNumber(new Date());
    }).toThrowError('startWeekFromFirstDayOfYear must be a boolean');
  });

  it('should return 0 when input date is before the start of the current year', () => {
    const pastDate = new Date('2022-01-01');
    const result = calendarComponent.getWeekNumber(pastDate);
    expect(result).toEqual(0);
  });

  it('should throw an error if showTime property is not a boolean', () => {
    expect(() => {
      calendarComponent.showTime = 1;
      calendarComponent.initTime(new Date());
    }).toThrowError('showTime must be a boolean');
  });

  it('should throw an error if timeOnly property is not a boolean', () => {
    expect(() => {
      calendarComponent.timeOnly = { value: true };
      calendarComponent.initTime(new Date());
    }).toThrowError('timeOnly must be a boolean');
  });

  it('should throw an error if input date is in the future', () => {
    const futureDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    expect(() => {
      calendarComponent.getWeekNumber(futureDate);
    }).toThrowError('Input date cannot be in the future');
  });

  it('should initialize weekNumbers array before pushing elements', () => {
    calendarComponent.weekNumbers = undefined;
    expect(() => {
      calendarComponent.pushWeekNumber();
    }).toThrowError('weekNumbers array is not initialized');
  });

  it('should throw an error if event parameter in navBackward function is not an object', () => {
    const event = 'click';
    expect(() => {
      calendarComponent.navBackward(event);
    }).toThrowError('event parameter must be an object');
  });

  it('should decrement year when navigating backward in month view', () => {
    const initialYear = calendarComponent.year;
    calendarComponent.navBackward({ preventDefault: () => {} });
    expect(calendarComponent.year).toEqual(initialYear - 1);
  });

  // Additional test to check if setCurrentHourPM function works correctly
  it('should set correct PM value for hours', fakeAsync(() => {
    calendarComponent.setCurrentHourPM(12);
    tick(50); // Wait for async operations to complete
    expect(calendarComponent.pm).toBe(true);
    expect(calendarComponent.currentHour).toBe(12);

    calendarComponent.setCurrentHourPM(18);
    tick(50);
    expect(calendarComponent.pm).toBe(true);
    expect(calendarComponent.currentHour).toBe(6);

    calendarComponent.setCurrentHourPM(0);
    tick(50);
    expect(calendarComponent.pm).toBe(false);
    expect(calendarComponent.currentHour).toBe(12);

    calendarComponent.setCurrentHourPM(6);
    tick(50);
    expect(calendarComponent.pm).toBe(false);
    expect(calendarComponent.currentHour).toBe(6);

    flush(); // Flush any remaining async operations
  }));

  // Additional test to check if setCurrentHourAM function works correctly
  it('should set correct AM value for hours', fakeAsync(() => {
    calendarComponent.setCurrentHourAM(12);
    tick(50); // Wait for async operations to complete
    expect(calendarComponent.pm).toBe(false);
    expect(calendarComponent.currentHour).toBe(0);

    calendarComponent.setCurrentHourAM(6);
    tick(50);
    expect(calendarComponent.pm).toBe(false);
    expect(calendarComponent.currentHour).toBe(6);

    calendarComponent.setCurrentHourAM(0);
    tick(50);
    expect(calendarComponent.pm).toBe(false);
    expect(calendarComponent.currentHour).toBe(0);

    calendarComponent.setCurrentHourAM(18);
    tick(50);
    expect(calendarComponent.pm).toBe(true);
    expect(calendarComponent.currentHour).toBe(6);

    flush(); // Flush any remaining async operations
  }));

});