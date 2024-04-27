import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  DateUtils  } from '../../../common/utils/dateutils';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    const fixture: ComponentFixture<CalendarComponent> = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should return false for isDateEquals function with invalid value', () => {
    const value = '2022-01-01';
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeFalse();
  });

  it('should return true for isMonthSelected function with valid date object and range selection', () => {
    const month = 1;
    const value = new Date(2022, 0, 1);
    component.isRangeSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and null year', () => {
    const month = 2;
    expect(component.isMonthDisabled(month)).toBeFalse();
  });

  it('should return false for isDateEquals function with invalid year', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2021 };
    expect(component.isDateEquals(value, dateMeta)).toBeFalse();
  });

  it('should return false for isMonthSelected function with null value', () => {
    const month = 1;
    expect(component.isMonthSelected(month, null)).toBeFalse();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 0;
    const year = 2020;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return false for isDateEquals function with invalid year', () => {
    const value = '2022-01-01';
    const dateMeta = { day: 1, month: 0, year: 2021 };
    expect(component.isDateEquals(value, dateMeta)).toBeFalse();
  });

  it('should return false for isMonthSelected function with invalid date object and single selection', () => {
    const month = 1;
    const value = '2022-03-15';
    component.isMultipleSelection = () => false;
    expect(component.isMonthSelected(month, value)).toBeFalse();
  });

  it('should return false for isMonthDisabled function with given month and null year', () => {
    const month = 2;
    expect(component.isMonthDisabled(month, null)).toBeFalse();
  });

  it('should return false for isDateEquals function with null value', () => {
    const value = null;
    const dateMeta = { day: 1, month: 1, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeFalse();
  });

  it('should return false for isMonthSelected function with invalid date object', () => {
    const month = 2;
    const value = '2022-03-15';
    expect(component.isMonthSelected(month, value)).toBeFalse();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 2;
    const year = 2022;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return false for isDateEquals function with null value', () => {
    const value = null;
    const dateMeta = { day: 1, month: 1, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeFalse();
  });

  it('should return false for isMonthSelected function with invalid date object', () => {
    const month = 2;
    const value = '2022-03-15';
    expect(component.isMonthSelected(month, value)).toBeFalse();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 2;
    const year = 2022;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return false for isDateEquals function with null value', () => {
    const value = null;
    const dateMeta = { day: 1, month: 1, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeFalse();
  });

  it('should return false for isMonthSelected function with invalid date object', () => {
    const month = 2;
    const value = '2022-03-15';
    expect(component.isMonthSelected(month, value)).toBeFalse();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 2;
    const year = 2022;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });

  it('should return true for isDateEquals function with valid date object', () => {
    const value = new Date(2022, 0, 1);
    const dateMeta = { day: 1, month: 0, year: 2022 };
    expect(component.isDateEquals(value, dateMeta)).toBeTrue();
  });

  it('should return true for isMonthSelected function with valid date object and multiple selection', () => {
    const month = 0;
    const value = new Date(2022, 0, 1);
    component.isMultipleSelection = () => true;
    expect(component.isMonthSelected(month, value)).toBeTrue();
  });

  it('should return false for isMonthDisabled function with given month and year', () => {
    const month = 1;
    const year = 2021;
    expect(component.isMonthDisabled(month, year)).toBeFalse();
  });
});