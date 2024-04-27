import {  TestBed, async  } from '@angular/core/testing';
// import {  Calendar  } from 'path-to-calendar-component-file';
import { Calendar } from 'primeng/calendar';
// import {  date  } from 'path-to-date-file';
import { MatDatepicker } from '@angular/material/datepicker';


describe('Calendar', () => {
  let component: Calendar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar]
    });
    component = TestBed.createComponent(Calendar).componentInstance;
  });

  it('should trigger createMonths function when minDate is set to a valid Date object (Edge case: minDate is a string that represents a valid date)', () => {
    const date = '2023-03-08'; // A valid date string
    spyOn(component, 'createMonths');

    component.minDate = new Date(date); // Convert the string to a Date object

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should not trigger createMonths function when minDate is set to an invalid Date object (Edge case: minDate is a string that is not a valid date)', () => {
    const date = 'invalid-date-string';
    spyOn(component, 'createMonths');

    component.minDate = new Date(date); // Passing an invalid date string to Date constructor

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not trigger createMonths function when minDate is set to a Date object with invalid month (Edge case: month value is greater than 12)', () => {
    const date = new Date(2023, 13, 1); // Invalid month (13)
    spyOn(component, 'createMonths');

    component.minDate = date;

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not trigger createMonths function when minDate is set to a Date object with invalid day (Edge case: day value is greater than the number of days in the given month)', () => {
    const date = new Date(2023, 3, 32); // Invalid day (32) for April (month 3)
    spyOn(component, 'createMonths');

    component.minDate = date;

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should trigger createMonths function when minDate is set to a Date object with year 0 (Edge case: year value is 0)', () => {
    const date = new Date(0, 0, 1); // Year 0 is valid in JavaScript
    spyOn(component, 'createMonths');

    component.minDate = date;

    expect(component.createMonths).toHaveBeenCalled();
  });

  // Add more test cases for the remaining scenarios as per the context

});