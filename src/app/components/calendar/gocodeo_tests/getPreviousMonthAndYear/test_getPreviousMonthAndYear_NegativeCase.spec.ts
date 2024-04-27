import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    });

    component = TestBed.inject(CalendarComponent);
  });

  it('should throw an error when month is negative and year is null', () => {
    expect(() => component.getPreviousMonthAndYear(-2, null)).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is undefined and year is negative', () => {
    expect(() => component.getPreviousMonthAndYear(undefined, -2023)).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is a negative decimal and year is positive', () => {
    expect(() => component.getPreviousMonthAndYear(-3.5, 2024)).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is a string and year is valid', () => {
    expect(() => component.getPreviousMonthAndYear('January', 2025)).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is valid and year is a string', () => {
    expect(() => component.getPreviousMonthAndYear(8, '2026')).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is NaN and year is valid', () => {
    expect(() => component.getPreviousMonthAndYear(NaN, 2027)).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is valid and year is NaN', () => {
    expect(() => component.getPreviousMonthAndYear(10, NaN)).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is null and year is valid', () => {
    expect(() => component.getPreviousMonthAndYear(null, 2028)).toThrowError('Invalid month or year provided.');
  });

  it('should throw an error when month is valid and year is undefined', () => {
    expect(() => component.getPreviousMonthAndYear(12, undefined)).toThrowError('Invalid month or year provided.');
  });
});