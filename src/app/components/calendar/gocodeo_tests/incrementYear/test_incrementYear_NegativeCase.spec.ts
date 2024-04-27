import {  TestBed  } from '@angular/core/testing';
import {  spyOn  } from 'jasmine';
import {  CalendarComponent  } from '../../src/app/components/calendar/calendar.ts';

describe('CalendarComponent', () => {
  
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('NegativeCase 1: When the year navigator is enabled and current year is less than the last value in the year options array, populateYearOptions method should not be called', () => {
    const spy = spyOn(component, 'populateYearOptions');
    component.yearNavigator = true;
    component.currentYear = 2021;
    component.yearOptions = [2022, 2023];

    component.incrementYear();

    expect(spy).not.toHaveBeenCalled();
  });

  it('NegativeCase 2: When year navigator is disabled, method should not check for current year and year options array values', () => {
    component.yearNavigator = false;
    const spy = spyOn(component, 'populateYearOptions');
    component.incrementYear();

    expect(spy).not.toHaveBeenCalled();
  });

  it('NegativeCase 3: When year navigator is enabled and current year is equal to the last value in the year options array, method should not calculate difference or update year options', () => {
    component.yearNavigator = true;
    component.currentYear = 2023;
    component.yearOptions = [2022, 2023];
    const spy = spyOn(component, 'populateYearOptions');

    component.incrementYear();

    expect(spy).not.toHaveBeenCalled();
  });

  it('NegativeCase 4: When year options array is empty, method should not retrieve or store any values in the _yearOptions variable', () => {
    component.yearOptions = [];
    component.incrementYear();

    expect(component._yearOptions.length).toEqual(0);
  });

  it('NegativeCase 5: When current year is negative value, method should not increment the current year', () => {
    component.currentYear = -2021;
    const initialYear = component.currentYear;
    component.incrementYear();

    expect(component.currentYear).toEqual(initialYear);
  });

  it('NegativeCase 6: When year navigator is enabled but year options array is not provided, method should not attempt to check or update year options', () => {
    component.yearNavigator = true;
    const spy = spyOn(component, 'populateYearOptions');
    component.incrementYear();

    expect(spy).not.toHaveBeenCalled();
  });

  it('NegativeCase 7: When setTimeout delay value is negative, updateFocus method should not be called with a negative delay', () => {
    const setTimeout = spyOn(window, 'setTimeout');
    component.incrementYear();
    expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1);
  });

  it('NegativeCase 8: When year navigator is enabled and last year option value is less than first year option value, method should not proceed with updating year options array', () => {
    const spy = spyOn(component, 'populateYearOptions');
    component.yearNavigator = true;
    component.currentYear = 2021;
    component.yearOptions = [2020, 2019];
  
    component.incrementYear();

    expect(spy).not.toHaveBeenCalled();
  });

  it('NegativeCase 9: When current year is greater than the last value in the year options array and year navigator is enabled, method should not calculate difference or update year options', () => {
    const spy = spyOn(component, 'populateYearOptions');
    component.yearNavigator = true;
    component.currentYear = 2025;
    component.yearOptions = [2022, 2023];
  
    component.incrementYear();

    expect(spy).not.toHaveBeenCalled();
  });

  it('NegativeCase 10: When current year is less than the first value in the year options array and year navigator is enabled, method should not calculate difference or update year options', () => {
    const spy = spyOn(component, 'populateYearOptions');
    component.yearNavigator = true;
    component.currentYear = 2020;
    component.yearOptions = [2022, 2023];
  
    component.incrementYear();

    expect(spy).not.toHaveBeenCalled();
  });
});