import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  YourServices  } from '../your-services';
import {  YourModules  } from '../your-modules';

describe('Calendar Component', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [YourServices],
      imports: [YourModules]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create the calendar component', () => {
    expect(component).toBeTruthy();
  });

  it('should get week number for a given date', () => {
    const date = new Date(2022, 0, 10); // January 10, 2022
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 1: Getting week number for a date in the previous year
  it('should get week number for a date in the previous year', () => {
    const date = new Date(2021, 11, 31); // December 31, 2021
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(53);
  });

  // Edge Case 2: Getting week number for a date in the next year
  it('should get week number for a date in the next year', () => {
    const date = new Date(2023, 0, 1); // January 1, 2023
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 3: Getting week number for a date on the last day of the month
  it('should get week number for a date on the last day of the month', () => {
    const date = new Date(2022, 0, 31); // January 31, 2022
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(5);
  });

  // Edge Case 4: Getting week number for a date on the first day of the month
  it('should get week number for a date on the first day of the month', () => {
    const date = new Date(2022, 0, 1); // January 1, 2022
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 5: Getting week number for a date in a leap year
  it('should get week number for a date in a leap year', () => {
    const date = new Date(2024, 1, 29); // February 29, 2024
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(9);
  });

  // Edge Case 6: Getting week number for a date in a month with 31 days
  it('should get week number for a date in a month with 31 days', () => {
    const date = new Date(2022, 0, 31); // January 31, 2022
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(5);
  });

  // Edge Case 7: Getting week number for a date in a month with 30 days
  it('should get week number for a date in a month with 30 days', () => {
    const date = new Date(2022, 3, 30); // April 30, 2022
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(17);
  });

  // Edge Case 8: Getting week number for a date in a month with 28 or 29 days
  it('should get week number for a date in a month with 28 or 29 days', () => {
    const date = new Date(2022, 1, 28); // February 28, 2022
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(9);
  });

  // Edge Case 9: Getting week number for a date on a Sunday
  it('should get week number for a date on a Sunday', () => {
    const date = new Date(2022, 0, 2); // January 2, 2022 (a Sunday)
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 10: Getting week number for a date on a Monday
  it('should get week number for a date on a Monday', () => {
    const date = new Date(2022, 0, 3); // January 3, 2022 (a Monday)
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 11: Getting week number for a date on a Tuesday
  it('should get week number for a date on a Tuesday', () => {
    const date = new Date(2022, 0, 4); // January 4, 2022 (a Tuesday)
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 12: Getting week number for a date on a Wednesday
  it('should get week number for a date on a Wednesday', () => {
    const date = new Date(2022, 0, 5); // January 5, 2022 (a Wednesday)
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 13: Getting week number for a date on a Thursday
  it('should get week number for a date on a Thursday', () => {
    const date = new Date(2022, 0, 6); // January 6, 2022 (a Thursday)
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 14: Getting week number for a date on a Friday
  it('should get week number for a date on a Friday', () => {
    const date = new Date(2022, 0, 7); // January 7, 2022 (a Friday)
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(1);
  });

  // Edge Case 15: Getting week number for a date on a Saturday
  it('should get week number for a date on a Saturday', () => {
    const date = new Date(2022, 0, 8); // January 8, 2022 (a Saturday)
    const weekNumber = component.getWeekNumber(date);
    expect(weekNumber).toBe(2);
  });
});