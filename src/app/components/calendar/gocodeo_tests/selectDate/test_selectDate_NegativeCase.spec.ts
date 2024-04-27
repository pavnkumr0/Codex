import {  TestBed  } from '@angular/core/testing';
import {  DatepickerComponent  } from '../datepicker.component';
import {  ReactiveFormsModule  } from '@angular/forms';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatepickerComponent]
    }).compileComponents();

    component = TestBed.createComponent(DatepickerComponent).componentInstance;
  });

  // Negative Case 1: Handle null `dateMeta` input
  it('should handle null dateMeta input gracefully', () => {
    const dateMeta = null;
    expect(() => component.selectDate(dateMeta)).not.toThrow();
  });

  // Negative Case 2: Handle null `currentHour` with `showTime` true
  it('should set hour to 0 when currentHour is null and showTime is true', () => {
    component.showTime = true;
    component.currentHour = null;
    component.currentMinute = 30;
    component.currentSecond = 45;

    const dateMeta = { year: 2022, month: 5, day: 10 };
    component.selectDate(dateMeta);

    expect(component.currentHour).toBe(0);
  });

  // Negative Case 3: Handle selected date outside range
  it('should handle selected date outside of minDate and maxDate range', () => {
    component.minDate = new Date(2022, 5, 10);
    component.maxDate = new Date(2022, 5, 15);
    const selectedDate = new Date(2022, 5, 5);

    component.selectDate(selectedDate);

    expect(component.selectedDate).toBe(component.minDate);
  });

  // Negative Case 4: Handle `isRangeSelection` true with only one date in `value`
  it('should handle isRangeSelection true with only one date in value array', () => {
    component.isRangeSelection = true;
    component.value = [new Date(2022, 5, 10)];

    const dateMeta = { year: 2022, month: 5, day: 15 };
    component.selectDate(dateMeta);

    expect(component.value[1]).toBeNull();
  });

  // Negative Case 5: Handle selected date before `minDate`
  it('should set selected date to minDate if before minDate', () => {
    component.minDate = new Date(2022, 5, 10);
    const selectedDate = new Date(2022, 5, 5);

    component.selectDate(selectedDate);

    expect(component.selectedDate).toBe(component.minDate);
  });

  // Negative Case 6: Handle selected date after `maxDate`
  it('should set selected date to maxDate if after maxDate', () => {
    component.maxDate = new Date(2022, 5, 15);
    const selectedDate = new Date(2022, 5, 20);

    component.selectDate(selectedDate);

    expect(component.selectedDate).toBe(component.maxDate);
  });

  // Negative Case 7: Handle `isMultipleSelection` true with null `value`
  it('should handle isMultipleSelection true with null value', () => {
    component.isMultipleSelection = true;
    component.value = null;

    const dateMeta = { year: 2022, month: 5, day: 10 };
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta]);
  });

  // Negative Case 8: Handle neither `isSingleSelection` nor `isRangeSelection` true
  it('should handle neither isSingleSelection nor isRangeSelection true', () => {
    component.isSingleSelection = false;
    component.isRangeSelection = false;

    const dateMeta = { year: 2022, month: 5, day: 10 };
    component.selectDate(dateMeta);

    expect(component.selectedDate).toBeNull();
    expect(component.value).toBeNull();
  });
});