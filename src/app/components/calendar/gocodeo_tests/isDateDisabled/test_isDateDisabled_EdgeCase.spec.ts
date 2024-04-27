import {  isDateDisabled  } from '../calendar.ts';

describe('Calendar Component', () => {

  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  afterEach(() => {
    component = null;
  });

  it('should return false when disabledDates array is empty', () => {
    component.disabledDates = [];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has one disabled date that matches the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has one disabled date that does not match the input parameters', () => {
    component.disabledDates = [new Date(2021, 0, 13)];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has multiple disabled dates and one of them matches the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2023, 0, 13)];
    const result = component.isDateDisabled(13, 1, 2023);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has multiple disabled dates and none of them match the input parameters', () => {
    component.disabledDates = [new Date(2021, 0, 13), new Date(2022, 0, 13)];
    const result = component.isDateDisabled(13, 1, 2023);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has disabled dates with different years but same month and day', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2023, 0, 13)];
    const result = component.isDateDisabled(13, 0, 2023);
    expect(result).toBeTruthy();
  });

  it('should return true when disabledDates array has disabled dates with different months but same year and day', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2022, 1, 13)];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeTruthy();
  });

  it('should return true when disabledDates array has disabled dates with different days but same year and month', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2022, 0, 14)];
    const result = component.isDateDisabled(14, 0, 2022);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has disabled dates with different years, months, and days', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2023, 1, 14)];
    const result = component.isDateDisabled(14, 1, 2023);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array has disabled dates with negative values', () => {
    component.disabledDates = [new Date(-2022, -1, -13)];
    const result = component.isDateDisabled(-13, -1, -2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array has disabled dates with year greater than current year', () => {
    const currentYear = new Date().getFullYear();
    component.disabledDates = [new Date(currentYear + 1, 0, 13)];
    const result = component.isDateDisabled(13, 1, currentYear + 1);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array has disabled dates with month greater than 12', () => {
    component.disabledDates = [new Date(2022, 13, 13)];
    const result = component.isDateDisabled(13, 13, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array has disabled dates with day greater than 31', () => {
    component.disabledDates = [new Date(2022, 0, 32)];
    const result = component.isDateDisabled(32, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array has disabled dates with year as 0', () => {
    component.disabledDates = [new Date(0, 0, 1)];
    const result = component.isDateDisabled(1, 0, 0);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array has disabled dates with month as 0', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    const result = component.isDateDisabled(13, 0, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array has disabled dates with day as 0', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    const result = component.isDateDisabled(0, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array is null', () => {
    component.disabledDates = null;
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDates array is undefined', () => {
    component.disabledDates = undefined;
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDays array has 0 and the input day is 0', () => {
    component.disabledDays = [0];
    const result = component.isDateDisabled(0, 1, 2022);
    expect(result).toBeTruthy();
  });

  it('should return true when disabledDays array has 7 and the input day is 7', () => {
    component.disabledDays = [7];
    const result = component.isDateDisabled(7, 1, 2022);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDays array has 0 and the input day is not 0', () => {
    component.disabledDays = [0];
    const result = component.isDateDisabled(1, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDays array has 7 and the input day is not 7', () => {
    component.disabledDays = [7];
    const result = component.isDateDisabled(6, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDays array has multiple days and the input day matches one of them', () => {
    component.disabledDays = [0, 3, 6];
    const result = component.isDateDisabled(6, 1, 2022);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDays array has multiple days and the input day does not match any of them', () => {
    component.disabledDays = [0, 3, 6];
    const result = component.isDateDisabled(2, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDays array has the current day and the input day is the current day', () => {
    const today = new Date();
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate(), today.getMonth(), today.getFullYear());
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDays array has the current day and the input day is not the current day', () => {
    const today = new Date();
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate() + 1, today.getMonth(), today.getFullYear());
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDays array has the current day and the input day is the current day in a different month', () => {
    const today = new Date();
    component.disabledDays = [today.getDay()];
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const result = component.isDateDisabled(nextMonth.getDate(), nextMonth.getMonth(), nextMonth.getFullYear());
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDays array has the current day and the input day is the current day in a different year', () => {
    const today = new Date();
    component.disabledDays = [today.getDay()];
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const result = component.isDateDisabled(nextYear.getDate(), nextYear.getMonth(), nextYear.getFullYear());
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDays array has the current day and the input day is the current day in a different month and year', () => {
    const today = new Date();
    component.disabledDays = [today.getDay()];
    const nextMonthNextYear = new Date(today.getFullYear() + 1, today.getMonth() + 1, today.getDate());
    const result = component.isDateDisabled(nextMonthNextYear.getDate(), nextMonthNextYear.getMonth(), nextMonthNextYear.getFullYear());
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDays array is null', () => {
    component.disabledDays = null;
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when disabledDays array is undefined', () => {
    component.disabledDays = undefined;
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return false when both disabledDates and disabledDays arrays are empty', () => {
    component.disabledDates = [];
    component.disabledDays = [];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date and disabledDays array has a disabled day that matches the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [0];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date and disabledDays array has a disabled day that does not match the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [1];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has multiple disabled dates and disabledDays array has a disabled day that matches one of the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2023, 0, 13)];
    component.disabledDays = [0];
    const result = component.isDateDisabled(13, 1, 2023);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has multiple disabled dates and disabledDays array has a disabled day that does not match any of the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2023, 0, 13)];
    component.disabledDays = [1];
    const result = component.isDateDisabled(13, 1, 2023);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date with different year but same month and day and disabledDays array has a disabled day that matches the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [0];
    const result = component.isDateDisabled(13, 0, 2023);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date with different year but same month and day and disabledDays array has a disabled day that does not match the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [1];
    const result = component.isDateDisabled(13, 0, 2023);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date with different months but same year and day and disabledDays array has a disabled day that matches the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [0];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date with different months but same year and day and disabledDays array has a disabled day that does not match the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [1];
    const result = component.isDateDisabled(13, 1, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date with different days but same year and month and disabledDays array has a disabled day that matches the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [0];
    const result = component.isDateDisabled(14, 0, 2022);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date with different days but same year and month and disabledDays array has a disabled day that does not match the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13)];
    component.disabledDays = [1];
    const result = component.isDateDisabled(14, 0, 2022);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has disabled dates with different years, months, and days and disabledDays array has a disabled day that matches one of the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2023, 1, 14)];
    component.disabledDays = [0];
    const result = component.isDateDisabled(14, 1, 2023);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has disabled dates with different years, months, and days and disabledDays array has a disabled day that does not match any of the input parameters', () => {
    component.disabledDates = [new Date(2022, 0, 13), new Date(2023, 1, 14)];
    component.disabledDays = [1];
    const result = component.isDateDisabled(14, 1, 2023);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date and disabledDays array has the current day that matches the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate())];
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate(), today.getMonth(), today.getFullYear());
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date and disabledDays array has the current day that does not match the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate())];
    component.disabledDays = [(today.getDay() + 1) % 7];
    const result = component.isDateDisabled(today.getDate(), today.getMonth(), today.getFullYear());
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has multiple disabled dates and disabledDays array has the current day that matches one of the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())];
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate(), today.getMonth(), today.getFullYear());
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has multiple disabled dates and disabledDays array has the current day that does not match any of the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())];
    component.disabledDays = [(today.getDay() + 1) % 7];
    const result = component.isDateDisabled(today.getDate(), today.getMonth(), today.getFullYear());
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date with different year but same month and day and disabledDays array has the current day that matches the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())];
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate(), today.getMonth(), today.getFullYear() + 1);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date with different year but same month and day and disabledDays array has the current day that does not match the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())];
    component.disabledDays = [(today.getDay() + 1) % 7];
    const result = component.isDateDisabled(today.getDate(), today.getMonth(), today.getFullYear() + 1);
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date with different months but same year and day and disabledDays array has the current day that matches the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())];
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate(), today.getMonth() + 1, today.getFullYear());
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date with different months but same year and day and disabledDays array has the current day that does not match the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())];
    component.disabledDays = [(today.getDay() + 1) % 7];
    const result = component.isDateDisabled(today.getDate(), today.getMonth() + 1, today.getFullYear());
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has a disabled date with different days but same year and month and disabledDays array has the current day that matches the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)];
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate() + 1, today.getMonth(), today.getFullYear());
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has a disabled date with different days but same year and month and disabledDays array has the current day that does not match the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)];
    component.disabledDays = [(today.getDay() + 1) % 7];
    const result = component.isDateDisabled(today.getDate() + 1, today.getMonth(), today.getFullYear());
    expect(result).toBeFalsy();
  });

  it('should return true when disabledDates array has disabled dates with different years, months, and days and disabledDays array has the current day that matches one of the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear() + 1, today.getMonth() + 1, today.getDate()), new Date(today.getFullYear() + 2, today.getMonth() + 2, today.getDate())];
    component.disabledDays = [today.getDay()];
    const result = component.isDateDisabled(today.getDate(), today.getMonth() + 2, today.getFullYear() + 2);
    expect(result).toBeTruthy();
  });

  it('should return false when disabledDates array has disabled dates with different years, months, and days and disabledDays array has the current day that does not match any of the input parameters', () => {
    const today = new Date();
    component.disabledDates = [new Date(today.getFullYear() + 1, today.getMonth() + 1, today.getDate()), new Date(today.getFullYear() + 2, today.getMonth() + 2, today.getDate())];
    component.disabledDays = [(today.getDay() + 1) % 7];
    const result = component.isDateDisabled(today.getDate(), today.getMonth() + 2, today.getFullYear() + 2);
    expect(result).toBeFalsy();
  });

});