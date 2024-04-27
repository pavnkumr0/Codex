import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.ts';

describe('CalendarComponent', () => {
  
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('should not allow setting a negative number as the value for `firstDayOfWeek` property', () => {
    expect(() => { component.firstDayOfWeek = -1; }).toThrowError('The value of `firstDayOfWeek` property cannot be negative.');
  });

  it('should not allow calling the setter method with a non-numeric value for `firstDayOfWeek`', () => {
    expect(() => { component.firstDayOfWeek = 'abc'; }).toThrowError('The value of `firstDayOfWeek` property must be a number.');
  });

  it('should not allow setting a decimal value for `firstDayOfWeek` property', () => {
    expect(() => { component.firstDayOfWeek = 6.5; }).toThrowError('The value of `firstDayOfWeek` property cannot be a decimal number.');
  });

  it('should not allow setting a fractional value for `firstDayOfWeek` property', () => {
    expect(() => { component.firstDayOfWeek = 1/3; }).toThrowError('The value of `firstDayOfWeek` property cannot be a fractional number.');
  });

  it('should not allow setting a value greater than 6 for `firstDayOfWeek` property', () => {
    expect(() => { component.firstDayOfWeek = 7; }).toThrowError('The value of `firstDayOfWeek` property cannot be greater than 6.');
  });

  it('should not allow calling the setter method with a null value for `firstDayOfWeek`', () => {
    expect(() => { component.firstDayOfWeek = null; }).toThrowError('The value of `firstDayOfWeek` property cannot be null.');
  });

  it('should not allow setting a negative infinity value for `firstDayOfWeek` property', () => {
    expect(() => { component.firstDayOfWeek = Number.NEGATIVE_INFINITY; }).toThrowError('The value of `firstDayOfWeek` property cannot be negative infinity.');
  });

  it('should not allow setting a negative zero value for `firstDayOfWeek` property', () => {
    expect(() => { component.firstDayOfWeek = -0; }).toThrowError('The value of `firstDayOfWeek` property cannot be negative zero.');
  });

});