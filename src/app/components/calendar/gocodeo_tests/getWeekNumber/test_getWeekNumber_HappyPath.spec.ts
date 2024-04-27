import {  CalendarComponent  } from '../calendar.component';
import {  TestBed  } from '@angular/core/testing';
import {  Date  } from 'date-fns';

/*
Unit test for the getWeekNumber method in the Calendar component
*/

describe('CalendarComponent', () => {
  let calendarComponent: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    });
    calendarComponent = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  it('should calculate week number from the first day of the year (Scenario 1)', () => {
    calendarComponent.startWeekFromFirstDayOfYear = true;
    const date = new Date('2022-01-01');
    const weekNumber = calendarComponent.getWeekNumber(date);
    expect(weekNumber).toEqual(1);
  });

  it('should calculate week number with startWeekFromFirstDayOfYear set to false (Scenario 2)', () => {
    calendarComponent.startWeekFromFirstDayOfYear = false;
    const date = new Date('2022-12-31');
    const weekNumber = calendarComponent.getWeekNumber(date);
    expect(weekNumber).toBeGreaterThanOrEqual(52);
    expect(weekNumber).toBeLessThanOrEqual(53);
  });

  it('should initialize time properties for afternoon time (Scenario 3)', () => {
    const date = new Date('2022-01-01T15:00:00');
    calendarComponent.showTime = true;
    calendarComponent.initTime(date);
    expect(calendarComponent.pm).toBeTrue();
    expect(calendarComponent.currentHour).toEqual(3);
    expect(calendarComponent.currentMinute).toEqual(0);
    expect(calendarComponent.currentSecond).toEqual(0);
  });

  it('should initialize time properties for midnight time only (Scenario 4)', () => {
    const date = new Date('2022-01-01T00:00:00');
    calendarComponent.timeOnly = true;
    calendarComponent.initTime(date);
    expect(calendarComponent.pm).toBeFalse();
    expect(calendarComponent.currentHour).toEqual(0);
    expect(calendarComponent.currentMinute).toEqual(0);
    expect(calendarComponent.currentSecond).toEqual(0);
  });

  it('should navigate backward in the calendar view for month view (Scenario 5)', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.year = 2022;
    calendarComponent.navBackward({});
    expect(calendarComponent.year).toEqual(2021);
  });

  it('should calculate week number for a leap year (Scenario 6)', () => {
    calendarComponent.startWeekFromFirstDayOfYear = true;
    const date = new Date('2020-02-29');
    const weekNumber = calendarComponent.getWeekNumber(date);
    expect(weekNumber).toEqual(9);
  });
});