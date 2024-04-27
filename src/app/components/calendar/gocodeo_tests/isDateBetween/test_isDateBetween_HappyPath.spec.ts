import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path/to/calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  it('should return true for isDateBetween scenario 1', () => {
    const start = new Date(2021, 0, 1);
    const end = new Date(2021, 11, 31);
    const dateMeta = { year: 2021, month: 5, day: 15 };
    
    expect(component.isDateBetween(start, end, dateMeta)).toBeTrue();
  });

  it('should return true for isComparable scenario 2', () => {
    component.value = [new Date(2021, 0, 1), new Date(2021, 0, 31)];
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true for isMonthSelected scenario 3', () => {
    component.value = new Date(2021, 5, 15);
    expect(component.isMonthSelected(6)).toBeTrue();
  });

  it('should return false for isMonthDisabled scenario 4', () => {
    expect(component.isMonthDisabled(2, 2021)).toBeFalse();
  });

  it('should return true for isDateEquals scenario 7', () => {
    const start = new Date(2021, 5, 15);
    const dateMeta = { year: 2021, month: 5, day: 15 };
    expect(component.isDateEquals(start, dateMeta)).toBeTrue();
  });

  it('should return true for isRangeSelection scenario 8', () => {
    component.value = [new Date(2021, 5, 15), new Date(2021, 5, 17)];
    expect(component.isRangeSelection()).toBeTrue();
  });

  it('should return true for isMultipleSelection scenario 9', () => {
    component.multipleSelection = true;
    expect(component.isMultipleSelection()).toBeTrue();
  });

  it('should return true for isSelectable scenario 10', () => {
    expect(component.isSelectable(1, 5, 2021, true)).toBeTrue();
  });

  it('should return false for isDateBetween scenario 5', () => {
    const start = new Date(2021, 0, 1);
    const end = new Date(2021, 11, 31);
    const dateMeta = { year: 2021, month: 12, day: 15 };
    
    expect(component.isDateBetween(start, end, dateMeta)).toBeFalse();
  });

  it('should return false for isComparable scenario 6', () => {
    component.value = null;
    expect(component.isComparable()).toBeFalse();
  });

  it('should return false for isMonthSelected scenario 11', () => {
    component.value = new Date(2021, 5, 15);
    expect(component.isMonthSelected(1)).toBeFalse();
  });

  it('should return true for isMonthDisabled scenario 12', () => {
    expect(component.isMonthDisabled(2, 2022)).toBeTrue();
  });

  it('should return false for isDateEquals scenario 13', () => {
    const start = new Date(2021, 5, 15);
    const dateMeta = { year: 2021, month: 5, day: 16 };
    expect(component.isDateEquals(start, dateMeta)).toBeFalse();
  });

  it('should return false for isRangeSelection scenario 14', () => {
    component.value = [new Date(2021, 5, 15)];
    expect(component.isRangeSelection()).toBeFalse();
  });

  it('should return false for isMultipleSelection scenario 15', () => {
    component.multipleSelection = false;
    expect(component.isMultipleSelection()).toBeFalse();
  });

  it('should return false for isSelectable scenario 16', () => {
    expect(component.isSelectable(1, 5, 2021, false)).toBeFalse();
  });
});