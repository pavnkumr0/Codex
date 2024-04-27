import {  getYear  } from '../calendar';

describe('getYear function', () => {
  let calendarComponent;
  let month;

  beforeEach(() => {
    calendarComponent = jasmine.createSpyObj('CalendarComponent', ['getYear']);
    month = { year: 2022 };
  });

  it('EdgeCase 1: this.currentView is month and this.currentYear is a positive number', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.currentYear = 2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(2022);
  });

  it('EdgeCase 2: this.currentView is month and this.currentYear is a negative number', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.currentYear = -2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(-2022);
  });

  it('EdgeCase 3: this.currentView is month and this.currentYear is zero', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.currentYear = 0;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(0);
  });

  it('EdgeCase 4: this.currentView is month and this.currentYear is a decimal number', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.currentYear = 2022.5;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(2022.5);
  });

  it('EdgeCase 5: this.currentView is month and this.currentYear is a large number', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.currentYear = 999999999999;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(999999999999);
  });

  it('EdgeCase 6: this.currentView is month and this.currentYear is undefined', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.currentYear = undefined;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(undefined);
  });

  it('EdgeCase 7: this.currentView is month and this.currentYear is null', () => {
    calendarComponent.currentView = 'month';
    calendarComponent.currentYear = null;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(null);
  });

  it('EdgeCase 8: this.currentView is not month and month.year is a positive number', () => {
    calendarComponent.currentView = 'week';
    expect(getYear.call(calendarComponent, month)).toEqual(2022);
  });

  it('EdgeCase 9: this.currentView is not month and month.year is a negative number', () => {
    calendarComponent.currentView = 'week';
    month.year = -2022;
    expect(getYear.call(calendarComponent, month)).toEqual(-2022);
  });

  it('EdgeCase 10: this.currentView is not month and month.year is zero', () => {
    calendarComponent.currentView = 'week';
    month.year = 0;
    expect(getYear.call(calendarComponent, month)).toEqual(0);
  });

  it('EdgeCase 11: this.currentView is not month and month.year is a decimal number', () => {
    calendarComponent.currentView = 'week';
    month.year = 2022.5;
    expect(getYear.call(calendarComponent, month)).toEqual(2022.5);
  });

  it('EdgeCase 12: this.currentView is not month and month.year is a large number', () => {
    calendarComponent.currentView = 'week';
    month.year = 999999999999;
    expect(getYear.call(calendarComponent, month)).toEqual(999999999999);
  });

  it('EdgeCase 13: this.currentView is not month and month.year is undefined', () => {
    calendarComponent.currentView = 'week';
    month.year = undefined;
    expect(getYear.call(calendarComponent, month)).toEqual(undefined);
  });

  it('EdgeCase 14: this.currentView is not month and month.year is null', () => {
    calendarComponent.currentView = 'week';
    month.year = null;
    expect(getYear.call(calendarComponent, month)).toEqual(null);
  });

  it('EdgeCase 15: this.currentView is empty and this.currentYear is a positive number', () => {
    calendarComponent.currentView = '';
    calendarComponent.currentYear = 2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(2022);
  });

  it('EdgeCase 16: this.currentView is empty and this.currentYear is a negative number', () => {
    calendarComponent.currentView = '';
    calendarComponent.currentYear = -2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(-2022);
  });

  it('EdgeCase 17: this.currentView is empty and this.currentYear is zero', () => {
    calendarComponent.currentView = '';
    calendarComponent.currentYear = 0;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(0);
  });

  it('EdgeCase 18: this.currentView is empty and this.currentYear is undefined', () => {
    calendarComponent.currentView = '';
    calendarComponent.currentYear = undefined;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(undefined);
  });

  it('EdgeCase 19: this.currentView is undefined and this.currentYear is a positive number', () => {
    calendarComponent.currentView = undefined;
    calendarComponent.currentYear = 2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(2022);
  });

  it('EdgeCase 20: this.currentView is undefined and this.currentYear is a negative number', () => {
    calendarComponent.currentView = undefined;
    calendarComponent.currentYear = -2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(-2022);
  });

  it('EdgeCase 21: this.currentView is undefined and this.currentYear is zero', () => {
    calendarComponent.currentView = undefined;
    calendarComponent.currentYear = 0;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(0);
  });

  it('EdgeCase 22: this.currentView is undefined and this.currentYear is undefined', () => {
    calendarComponent.currentView = undefined;
    calendarComponent.currentYear = undefined;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(undefined);
  });

  it('EdgeCase 23: this.currentView is null and this.currentYear is a positive number', () => {
    calendarComponent.currentView = null;
    calendarComponent.currentYear = 2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(2022);
  });

  it('EdgeCase 24: this.currentView is null and this.currentYear is a negative number', () => {
    calendarComponent.currentView = null;
    calendarComponent.currentYear = -2022;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(-2022);
  });

  it('EdgeCase 25: this.currentView is null and this.currentYear is zero', () => {
    calendarComponent.currentView = null;
    calendarComponent.currentYear = 0;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(0);
  });

  it('EdgeCase 26: this.currentView is null and this.currentYear is undefined', () => {
    calendarComponent.currentView = null;
    calendarComponent.currentYear = undefined;
    expect(getYear.call(calendarComponent, calendarComponent)).toEqual(undefined);
  });
});